/// <reference lib="webworker" />
import Dexie from 'dexie';
import type { ISong } from '@/lib/songs/model/ISong';
import type { IPlaylist } from '@/lib/playlists/model/IPlaylist';

export class DataBase extends Dexie {
  songs: Dexie.Table<ISong, string>;
  playlists: Dexie.Table<IPlaylist, number>;
  settings: Dexie.Table<any, string>;

  constructor() {
    super("DataBase");

    this.version(1).stores({
      songs: "hash, &title, meta, verses, searchText",
      playlists: "++id, &name, color, songsHashes",
      settings: "key, value"
    });

    this.songs = this.table("songs");
    this.playlists = this.table("playlists");
    this.settings = this.table("settings");
  }

  async putDate(date: string) {
    return await this.settings.put({ key: 'date', value: date });
  }

  async getDate() {
    return await this.settings.get('date');
  }
}
