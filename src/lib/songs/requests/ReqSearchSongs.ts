import { Req } from '@/lib/requests/Req';
import { ReqCommand } from '@/lib/requests/ReqCommand';

export class ReqSearchSongs extends Req {
  constructor(query: string) {
    super(ReqCommand.SEARCH_SONGS, query);
  }
}
