import { Req } from '@/lib/requests/Req';
import { ReqCommand } from '@/lib/requests/ReqCommand';

export class ReqListPlaylists extends Req {
  constructor() {
    super(ReqCommand.LIST_PLAYLISTS);
  }
}
