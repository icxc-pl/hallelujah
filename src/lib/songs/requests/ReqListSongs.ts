import { Req } from '@/lib/requests/Req';
import { ReqCommand } from '@/lib/requests/ReqCommand';

export class ReqListSongs extends Req {
  constructor() {
    super(ReqCommand.LIST_SONGS);
  }
}
