import { Req } from '@/lib/requests/Req';
import { ReqCommand } from '@/lib/requests/ReqCommand';

export class ReqUpdatePlaylist extends Req {
  constructor(id: number, changes: Object) {
    super(ReqCommand.UPDATE_PLAYLIST, [id, changes]);
  }
}
