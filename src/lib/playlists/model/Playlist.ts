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

  toObject(): IPlaylist {
    return {
      id: this.id,
      name: this.name,
      color: this.color,
      songsHashes: this.songsHashes
    };
  }
}

export function duplicatePlaylist(playlist: IPlaylist, newTitle?: string): Playlist {
  const newPLaylist = new Playlist(newTitle ? newTitle : playlist.name);
  newPLaylist.color = playlist.color;
  newPLaylist.songsHashes = playlist.songsHashes.slice();
  return newPLaylist;
}
