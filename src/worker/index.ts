/// <reference lib="webworker" />
import { SongImporter } from '@/lib/songs/SongImporter';
import { DataBase } from './DataBase';
import { fetchSongsFile, fetchLastModified } from './fetch';
import { ClientRequestCommand, type ClientRequest } from '@/lib/requests';
import { WorkerResponse } from '@/lib/responses';

console.info("Worker is running");
const db = new DataBase();


function fetchSongs() {
  return fetchSongsFile().then((res) => {
    const importer = new SongImporter();
    importer.process(res.text);

    if (res.date) {
      (<DataBase>db).putDate(res.date);
    } else {
      console.warn("No date in response");
    }
  
    return (<DataBase>db).songs.bulkAdd(importer.songs);
  });
}


db.on('ready', (db) => {
  console.info("Database is ready");

  return (<DataBase>db).songs.count((count) => {
    if (count > 0) {
      console.info("Already populated");

      return fetchLastModified().then((date) => {
        return (<DataBase>db).getDate().then((dbDate) => {

          if (dbDate && date && dbDate.value !== date) {
            console.info("Database is outdated. Fetching...");
            (<DataBase>db).songs.clear();
            return fetchSongs();

          } else {
            console.info("Database is up to date");
          }

        });
      });
    } else {
      console.info("Database is empty. Populating...");
      return fetchSongs();
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

    case ClientRequestCommand.GET_PLAYLIST:
      return db.playlists.get(request.args).then((playlist) => {
        self.postMessage(new WorkerResponse(request.uuid, playlist));
      });
    
    case ClientRequestCommand.LIST_PLAYLISTS:
      return db.playlists.toArray().then((playlists) => {
        self.postMessage(new WorkerResponse(request.uuid, playlists));
      });

    case ClientRequestCommand.LIST_PLAYLISTS_WITHOUT_SONG:
      return db.playlists.where('songsHashes').noneOf([
        request.args
      ]).toArray().then((playlists) => {
        self.postMessage(new WorkerResponse(request.uuid, playlists));
      });

    case ClientRequestCommand.CREATE_PLAYLIST:
      return db.playlists.add(request.args).then((id) => {
        self.postMessage(new WorkerResponse(request.uuid, id));
      });

    case ClientRequestCommand.DELETE_PLAYLIST:
      return db.playlists.delete(request.args).then(() => {
        self.postMessage(new WorkerResponse(request.uuid, true));
      });

    case ClientRequestCommand.UPDATE_PLAYLIST:
      return db.playlists.update(request.args.id, request.args).then(() => {
        self.postMessage(new WorkerResponse(request.uuid, true));
      });

    default:
      self.postMessage(new WorkerResponse(request.uuid, 'ERR! Unknown command'));
  }
};
