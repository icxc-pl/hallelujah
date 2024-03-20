import { ClientRequest } from '@/lib/requests/ClientRequest';
import { ClientRequestCommand } from '@/lib/requests/ClientRequestCommand';

export class ClientRequestListPlaylistSongs extends ClientRequest {
  constructor(id: number) {
    super(ClientRequestCommand.LIST_PLAYLIST_SONGS, id);
  }
}
