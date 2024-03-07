import { ClientRequest } from '@/lib/requests/ClientRequest';
import { ClientRequestCommand } from '@/lib/requests/ClientRequestCommand';
import type { IPlaylist } from '../model';

export class ClientRequestCreatePlaylist extends ClientRequest {
  constructor(playlist: IPlaylist) {
    super(ClientRequestCommand.CREATE_PLAYLIST, playlist);
  }
}
