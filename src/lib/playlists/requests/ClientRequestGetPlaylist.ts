import { ClientRequest } from '@/lib/requests/ClientRequest';
import { ClientRequestCommand } from '@/lib/requests/ClientRequestCommand';

export class ClientRequestGetPlaylist extends ClientRequest {
  constructor(id: number) {
    super(ClientRequestCommand.GET_PLAYLIST, id);
  }
}
