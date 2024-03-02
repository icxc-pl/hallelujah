import { ClientRequest } from '@/lib/requests/ClientRequest';
import { ClientRequestCommand } from '@/lib/requests/ClientRequestCommand';

export class ClientRequestListSongs extends ClientRequest {
  constructor() {
    super(ClientRequestCommand.LIST_SONGS);
  }
}
