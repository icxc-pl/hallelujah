import { ClientRequest } from "./requests/ClientRequest";

import type { ISong } from "./songs/model/ISong";
import { ClientRequestListSongs, ClientRequestSearchSongs, ClientRequestGetSong } from "./songs/requests";

import type { IPlaylist } from "./playlists/model/IPlaylist";
import { ClientRequestListPlaylists, ClientRequestGetPlaylist } from "./playlists/requests";

import type { WorkerResponse } from "./responses/WorkerResponse";

/**
 * Map of requests to resolve promises
 */
const requests = new Map<string, Function>();

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
    const resolve = requests.get(response.uuid);
    if (resolve) {
      resolve(response.data);
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
  const promise = new Promise<Object>((resolve) => {
    requests.set(request.uuid, resolve);
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
