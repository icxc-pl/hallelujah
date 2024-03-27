/// <reference lib="webworker" />
import { SongImporter } from '@/lib/songs/SongImporter';
import { DataBase } from './DataBase';
import { fetchSongsFile, fetchLastModified } from './fetch';
import { ReqCommand, type Req } from '@/lib/requests';
import { WorkerResponse } from '@/lib/responses';
import type { IPlaylist } from '@/lib/playlists/model';

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
  const request: Req = event.data;
  
  switch (request.command) {

    //#region ----------------- Songs -----------------

    case ReqCommand.GET_SONG:
      return db.songs.get(request.args).then((song) => {
        self.postMessage(new WorkerResponse(request.uuid, typeof song === "undefined" ? null : song));
      });
    
    case ReqCommand.LIST_SONGS:
      return db.songs.orderBy("title").toArray().then((songs) => {
        self.postMessage(new WorkerResponse(request.uuid, songs));
      });

    case ReqCommand.SEARCH_SONGS:
      //eslint-disable-next-line
      const r = new RegExp(request.args, 'i')
      return db.songs.filter((song) => {
        return song.searchText.match(r) != null;
      }).sortBy("title").then((songs) => {
        self.postMessage(new WorkerResponse(request.uuid, songs));
      });

    //#endregion

    //#region ----------------- Playlist -----------------

    case ReqCommand.GET_PLAYLIST:
      return db.playlists.get(request.args).then((playlist) => {
        self.postMessage(new WorkerResponse(request.uuid, playlist));
      });

    case ReqCommand.CREATE_PLAYLIST:
      return db.playlists.add(request.args).then((id) => {
        self.postMessage(new WorkerResponse(request.uuid, id));
      });

    case ReqCommand.DELETE_PLAYLIST:
      return db.playlists.delete(request.args).then(() => {
        self.postMessage(new WorkerResponse(request.uuid, true));
      });

    case ReqCommand.UPDATE_PLAYLIST:
      return db.transaction('rw', db.playlists, async () => {
        const count = await db.playlists.update(request.args[0], request.args[1]);

        let response: any;
        if (count === 0) {
          response = 'ERR! Playlist not found';
        } else {
          response = await db.playlists.get(request.args[0]);
        }

        self.postMessage(new WorkerResponse(request.uuid, response));
      });
    
    case ReqCommand.LIST_PLAYLISTS:
      return db.playlists.toArray().then((playlists) => {
        self.postMessage(new WorkerResponse(request.uuid, playlists));
      });

    case ReqCommand.LIST_PLAYLISTS_WITHOUT_SONG:
      return db.playlists.where('songsHashes').noneOf([ [request.args] ]).toArray().then((playlists) => {
        self.postMessage(new WorkerResponse(request.uuid, playlists));
      });

    //#endregion

    //#region ----------------- Playlist's songs -----------------

    case ReqCommand.LIST_PLAYLIST_SONGS:
      return db.transaction('r', db.playlists, db.songs, async () => {
        const playlist = await db.playlists.get(request.args);
        
        let response: any = [];

        if (playlist == null) {
          response = 'ERR! Playlist not found';

        } else if (playlist.songsHashes.length === 0) {
          // nothing to do

        } else {
          for (let i = 0; i < playlist.songsHashes.length; i++) {  
            const song = await db.songs.get(playlist.songsHashes[i]);
            if (song) response.push(song);
          }
        }

        self.postMessage(new WorkerResponse(request.uuid, response));
      });

    case ReqCommand.ADD_SONG_TO_PLAYLIST:
      return db.transaction('rw', db.playlists, async () => {
        const playlist = await db.playlists.get(request.args[0]);

        let response: any;

        if (playlist == null || playlist.id == null) {
          response = 'ERR! Playlist not found';

        } else if (playlist.songsHashes.includes(request.args[1])) {
          response = 'ERR! Song already in playlist';

        } else {
          playlist.songsHashes.push(request.args[1]);
          db.playlists.update(playlist.id, { songsHashes: playlist.songsHashes });
          response = playlist;

        }

        self.postMessage(new WorkerResponse(request.uuid, response));
      });

    case ReqCommand.REMOVE_SONG_FROM_PLAYLIST:
      return db.transaction('rw', db.playlists, async () => {
        const playlist = await db.playlists.get(request.args[0]);

        let response: any;

        if (playlist == null || playlist.id == null) {
          response = 'ERR! Playlist not found';

        } else if (!playlist.songsHashes.includes(request.args[1])) {
          response = 'ERR! Song not in playlist';

        } else {
          playlist.songsHashes = playlist.songsHashes.filter((hash) => hash !== request.args[1]);
          const count = await db.playlists.update(playlist.id, { songsHashes: playlist.songsHashes });
          
          if (count === 0) {
            response = 'ERR! Playlist not found';
          } else {
            response = playlist;
          }
        }

        self.postMessage(new WorkerResponse(request.uuid, response));
      });

    //#endregion

    default:
      self.postMessage(new WorkerResponse(request.uuid, 'ERR! Unknown command'));
  }
};
