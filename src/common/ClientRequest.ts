// This class is used to make a request to WebWorker
// It only represents the format and structure of the request

import { v4 as uuid } from 'uuid';

export enum ClientRequestCommand {
  GET_SONG = 'GET_SONG',
  LIST_SONGS = 'LIST_SONGS',
  SEARCH_SONGS = 'SEARCH_SONGS'
}

export class ClientRequest {
  public uuid: string = uuid();

  constructor(
    public command: ClientRequestCommand,
    public args?: any
  ) {}
}

export class ClientRequestGetSong extends ClientRequest {
  constructor(id: number) {
    super(ClientRequestCommand.GET_SONG, id);
  }
}

export class ClientRequestListSongs extends ClientRequest {
  constructor() {
    super(ClientRequestCommand.LIST_SONGS);
  }
}

export class ClientRequestSearchSongs extends ClientRequest {
  constructor(query: string) {
    super(ClientRequestCommand.SEARCH_SONGS, query);
  }
}
