import { ClientRequest } from '@/lib/requests/ClientRequest';
import { ClientRequestCommand } from '@/lib/requests/ClientRequestCommand';

export class ClientRequestDeletePlaylist extends ClientRequest {
  constructor(id: number) {
    super(ClientRequestCommand.DELETE_PLAYLIST, id);
  }
}
