import { Req } from '@/lib/requests/Req';
import { ReqCommand } from '@/lib/requests/ReqCommand';
import type { IPlaylist } from '../model';

export class ReqUpdatePlaylist extends Req {
  constructor(playlist: IPlaylist) {
    super(ReqCommand.UPDATE_PLAYLIST, playlist);
  }
}
