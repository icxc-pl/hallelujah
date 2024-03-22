import { Req } from '@/lib/requests/Req';
import { ReqCommand } from '@/lib/requests/ReqCommand';

export class ReqGetPlaylist extends Req {
  constructor(id: number) {
    super(ReqCommand.GET_PLAYLIST, id);
  }
}
