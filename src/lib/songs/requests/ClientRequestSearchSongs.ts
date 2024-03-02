import { ClientRequest } from '@/lib/requests/ClientRequest';
import { ClientRequestCommand } from '@/lib/requests/ClientRequestCommand';

export class ClientRequestSearchSongs extends ClientRequest {
  constructor(query: string) {
    super(ClientRequestCommand.SEARCH_SONGS, query);
  }
}
