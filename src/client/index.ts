import {
  ClientRequest,
  ClientRequestListSongs,
  ClientRequestSearchSongs,
  ClientRequestGetSong
 } from "@/common/ClientRequest";
import type { WorkerResponse } from "@/common/WorkerResponse";
import type { ISong } from "@/songs/model/ISong";

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
 * Get song
 * @param id number
 * @returns Promise<ISong>
 */
export function getSong(id: number): Promise<ISong> {
  return post(new ClientRequestGetSong(id)) as Promise<ISong>;
}
