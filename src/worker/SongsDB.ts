/// <reference lib="webworker" />
import Dexie from 'dexie';
import type { ISong } from '@/songs/model/ISong';

export class SongsDB extends Dexie {
  songs: Dexie.Table<ISong, number>; // number is the type of the primary key

  constructor() {
    super("SongsDB");
    this.version(1).stores({
      songs: "++id, uuid, title, normalizedTitle, meta, verses"
    });
    this.songs = this.table("songs");
  }
}
