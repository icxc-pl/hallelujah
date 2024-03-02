/// <reference lib="webworker" />
import Dexie from 'dexie';
import type { ISong } from '@/lib/songs/model/ISong';
import type { IPlaylist } from '@/lib/playlists/model/IPlaylist';

export class DataBase extends Dexie {
  songs: Dexie.Table<ISong, number>;
  playlists: Dexie.Table<IPlaylist, number>;

  constructor() {
    super("DataBase");
    this.version(1).stores({
      songs: "++id, uuid, title, normalizedTitle, meta, verses",
      playlists: "++id, uuid, title, songsIds"
    });
    this.songs = this.table("songs");
    this.playlists = this.table("playlists");
  }
}
