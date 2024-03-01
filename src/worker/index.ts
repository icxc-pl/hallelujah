/// <reference lib="webworker" />
import { SongImporter } from '@/songs/SongImporter';
import { SongsDB } from './SongsDB';
import { fetchSongsFile } from './fetch';
import { ClientRequestCommand, type ClientRequest } from '@/common/ClientRequest';
import { WorkerResponse } from '@/common/WorkerResponse';


const db = new SongsDB();

db.on('ready', (db) => {
  return (<SongsDB>db).songs.count((count) => {
    if (count > 0) {
      console.info("Already populated");
    } else {
      console.info("Database is empty. Populating...");
      return fetchSongsFile().then((songsFile) => {
        const importer = new SongImporter();
        importer.process(songsFile);
      
        return (<SongsDB>db).songs.bulkAdd(importer.songs);
      });
    }
  });
});

db.open();

self.onmessage = (event: MessageEvent) => {
  console.log("[Worker] otrzymałem wiadomość", event.data);
  const request: ClientRequest = event.data;
  
  switch (request.command) {
    case ClientRequestCommand.GET_SONG:
      return db.songs.get(request.args).then((song) => {
        self.postMessage(new WorkerResponse(request.uuid, song));
      });

    
    case ClientRequestCommand.LIST_SONGS:
      return db.songs.toArray().then((songs) => {
        self.postMessage(new WorkerResponse(request.uuid, songs));
      });

    case ClientRequestCommand.SEARCH_SONGS:
      return db.songs.where('normalizedTitle').startsWithAnyOfIgnoreCase(request.args).toArray().then((songs) => {
        self.postMessage(new WorkerResponse(request.uuid, songs));
      });
  }
};
