import { ClientRequest } from '@/lib/requests/ClientRequest';
import { ClientRequestCommand } from '@/lib/requests/ClientRequestCommand';

export class ClientRequestGetSong extends ClientRequest {
  constructor(id: number) {
    super(ClientRequestCommand.GET_SONG, id);
  }
}
