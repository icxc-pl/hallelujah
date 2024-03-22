import { Req } from '@/lib/requests/Req';
import { ReqCommand } from '@/lib/requests/ReqCommand';
import type { IPlaylist } from '../model';

export class ReqCreatePlaylist extends Req {
  constructor(playlist: IPlaylist) {
    super(ReqCommand.CREATE_PLAYLIST, playlist);
  }
}
