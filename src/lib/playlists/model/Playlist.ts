import type { IPlaylist } from './IPlaylist';
import { normalizeTitle, validateTitle } from '@/lib/helpers/validate';

export class Playlist implements IPlaylist {
  id?: number;
  name: string;
  color: string | null;
  songsHashes: string[];

  constructor(
    name: string
  ) {
    name = normalizeTitle(name);
    if (!validateTitle(name)) {
      throw new Error("Nazwa Playlisty jest nieprawidłowa."); // TODO: Może użyć JSON Schema do walidacji?
    }

    this.name = name;
    this.color = null;
    this.songsHashes = [];    
  }
}
