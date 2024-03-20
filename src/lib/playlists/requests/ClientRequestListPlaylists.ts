import { ClientRequest } from '@/lib/requests/ClientRequest';
import { ClientRequestCommand } from '@/lib/requests/ClientRequestCommand';

export class ClientRequestListPlaylists extends ClientRequest {
  constructor() {
    super(ClientRequestCommand.LIST_PLAYLISTS);
  }
}

export class ClientRequestListPlaylistsWithoutSong extends ClientRequest {
  constructor(hash: string) {
    super(ClientRequestCommand.LIST_PLAYLISTS_WITHOUT_SONG, hash);
  }
}
