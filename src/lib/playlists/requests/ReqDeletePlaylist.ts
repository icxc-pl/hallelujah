import { Req } from '@/lib/requests/Req';
import { ReqCommand } from '@/lib/requests/ReqCommand';

export class ReqDeletePlaylist extends Req {
  constructor(id: number) {
    super(ReqCommand.DELETE_PLAYLIST, id);
  }
}
