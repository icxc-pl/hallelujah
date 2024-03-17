import { ClientRequest } from '@/lib/requests/ClientRequest';
import { ClientRequestCommand } from '@/lib/requests/ClientRequestCommand';
import type { IPlaylist } from '../model';

export class ClientRequestUpdatePlaylist extends ClientRequest {
  constructor(playlist: IPlaylist) {
    super(ClientRequestCommand.UPDATE_PLAYLIST, playlist);
  }
}
