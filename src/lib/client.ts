import { ClientRequest } from "./requests/ClientRequest";

import type { ISong } from "./songs/model/ISong";
import { ClientRequestListSongs, ClientRequestSearchSongs, ClientRequestGetSong } from "./songs/requests";

import type { IPlaylist } from "./playlists/model/IPlaylist";
import { ClientRequestListPlaylists, ClientRequestGetPlaylist, ClientRequestCreatePlaylist, ClientRequestDeletePlaylist } from "./playlists/requests";

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
 * @param id number
 * @returns Promise<ISong>
 */
export function getSong(id: number): Promise<ISong> {
  return post(new ClientRequestGetSong(id)) as Promise<ISong>;
}


/**
 * Get songs list
 * @returns Promise<Array<IPlaylist>>
 */
export function getPlaylistsList(): Promise<Array<IPlaylist>> {
  return post(new ClientRequestListPlaylists()) as Promise<Array<IPlaylist>>;
}

/**
 * Get song
 * @param id number
 * @returns Promise<ISong>
 */
export function getPlaylist(id: number): Promise<IPlaylist> {
  return post(new ClientRequestGetPlaylist(id)) as Promise<IPlaylist>;
}

/**
 * Create playlist
 * @param playlist IPlaylist
 * @returns Promise<IPlaylist>
 */
export function createPlaylist(playlist: IPlaylist): Promise<number> {
  return post(new ClientRequestCreatePlaylist(playlist)) as Promise<number>;
}

/**
 * Update playlist
 * @param playlist IPlaylist
 * @returns Promise<IPlaylist>
 */
export function deletePlaylist(id: number): Promise<boolean> {
  return post(new ClientRequestDeletePlaylist(id)) as Promise<boolean>;
}
