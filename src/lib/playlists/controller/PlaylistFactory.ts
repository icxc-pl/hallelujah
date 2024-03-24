import { type IPlaylist } from '../model/IPlaylist';
import { normalizeTitle, validateTitle } from '@/lib/helpers/validate';

export function normalizePlaylistTitle(name: string): string {
  name = normalizeTitle(name);
  if (!validateTitle(name)) {
    throw new Error("Nazwa Playlisty jest nieprawidłowa."); // TODO: Może użyć JSON Schema do walidacji?
  }
  return name;
}

export function createPlaylistObject(name: string, color: string | null = null): IPlaylist {
  return {
    name: normalizePlaylistTitle(name),
    color,
    songsHashes: []
  };
}

export function duplicatePlaylistObject(original: IPlaylist, name: string): IPlaylist {
  return {
    name: normalizePlaylistTitle(name),
    color: original.color,
    songsHashes: Array.from(original.songsHashes)
  };
}
