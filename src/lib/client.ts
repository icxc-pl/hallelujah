import { ClientRequest } from "./requests/ClientRequest";

import type { ISong } from "./songs/model/ISong";
import { ClientRequestListSongs, ClientRequestSearchSongs, ClientRequestGetSong } from "./songs/requests";

import type { IPlaylist } from "./playlists/model/IPlaylist";
import { ClientRequestListPlaylists, ClientRequestListPlaylistsWithoutSong, ClientRequestGetPlaylist, ClientRequestCreatePlaylist, ClientRequestDeletePlaylist, ClientRequestUpdatePlaylist } from "./playlists/requests";

import type { WorkerResponse } from "./responses/WorkerResponse";

/**
 * Map of requests to resolve promises
 */
const requests = new Map<string, [Function, Function]>();

/**
 * Main worker to handle requests
 */
const worker = new Worker(new URL('../worker', import.meta.url), {
  type: 'module'
});

/**
 * Handle worker response
 * @param event MessageEvent
 */
worker.onmessage = (event) => {
  const response: WorkerResponse = event.data;

  if (!response.uuid) {
    return;
  }

  if (requests.has(response.uuid)) {
    const r = requests.get(response.uuid);
    if (r) {
      if (typeof response.data === "string" && response.data.startsWith("ERR!")) {
        r[1](response.data.substring(5));
      } else {
        r[0](response.data);
      }
    }
    requests.delete(response.uuid);
  }
};

/**
 * Post request to worker
 * @param request ClientRequest
 * @returns Promise<Object>
 */
function post(request: ClientRequest): Promise<Object> {
  const promise = new Promise<Object>((resolve, reject) => {
    requests.set(request.uuid, [resolve, reject]);
  });
  worker.postMessage(request);
  return promise;
}

/**
 * Get songs list
 * @returns Promise<Array<ISong>>
 */
export function getSongsList(): Promise<Array<ISong>> {
  return post(new ClientRequestListSongs()) as Promise<Array<ISong>>;
}

/**
 * Search songs
 * @returns Promise<Array<ISong>>
 */
export function searchSongs(query: string): Promise<Array<ISong>> {
  return post(new ClientRequestSearchSongs(query)) as Promise<Array<ISong>>;
}

/**
 * Get song
 * @param hash Song hash
 * @returns Promise<ISong>
 */
export function getSong(hash: string): Promise<ISong> {
  return post(new ClientRequestGetSong(hash)) as Promise<ISong>;
}

/**
 * Get playlists list
 * @returns Promise<Array<IPlaylist>>
 */
export function getPlaylistsList(): Promise<Array<IPlaylist>> {
  return post(new ClientRequestListPlaylists()) as Promise<Array<IPlaylist>>;
}

/**
 * Get playlists list without song
 * @returns Promise<Array<IPlaylist>>
 */
export function getPlaylistsListWithoutSong(hash: string): Promise<Array<IPlaylist>> {
  return post(new ClientRequestListPlaylistsWithoutSong(hash)) as Promise<Array<IPlaylist>>;
}

/**
 * Get playlist
 * @param id number
 * @returns Promise<IPlaylist>
 */
export function getPlaylist(id: number): Promise<IPlaylist> {
  return post(new ClientRequestGetPlaylist(id)) as Promise<IPlaylist>;
}

/**
 * Create playlist
 * @param playlist IPlaylist
 * @returns Promise<IPlaylist>
 */
export async function createPlaylist(playlist: IPlaylist): Promise<IPlaylist> {
   const id = (await post(new ClientRequestCreatePlaylist(playlist))) as number;
   playlist.id = id;
   return playlist;
}

/**
 * Update playlist
 * @param playlist IPlaylist
 * @returns Promise<IPlaylist>
 */
export function deletePlaylist(id: number): Promise<boolean> {
  return post(new ClientRequestDeletePlaylist(id)) as Promise<boolean>;
}

/**
 * Update playlist
 * @param playlist IPlaylist
 * @returns Promise<IPlaylist>
 */
export function updatePlaylist(playlist: IPlaylist): Promise<IPlaylist> {
  return post(new ClientRequestUpdatePlaylist(playlist)) as Promise<IPlaylist>;
}
