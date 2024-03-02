import { ClientRequest } from '@/lib/requests/ClientRequest';
import { ClientRequestCommand } from '@/lib/requests/ClientRequestCommand';

export class ClientRequestListPlaylists extends ClientRequest {
  constructor() {
    super(ClientRequestCommand.LIST_PLAYLISTS);
  }
}
