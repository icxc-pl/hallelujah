import { v4 as uuid } from 'uuid';
import type { IPlaylist } from './IPlaylist';
import { normalizeTitle, validateTitle } from '@/lib/helpers/validate';

export class Playlist implements IPlaylist {
  id?: number;
  uuid: string;
  title: string;
  color: string | null;
  songsUuids: string[];

  constructor(
    title: string
  ) {
    title = normalizeTitle(title);
    if (!validateTitle(title)) {
      throw new Error("Nazwa Playlisty jest nieprawidłowa."); // TODO: Może użyć JSON Schema do walidacji?
    }

    this.uuid = uuid();
    this.title = title;
    this.color = null;
    this.songsUuids = [];    
  }
}
