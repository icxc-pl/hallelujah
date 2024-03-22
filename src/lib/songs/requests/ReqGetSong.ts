import { Req } from '@/lib/requests/Req';
import { ReqCommand } from '@/lib/requests/ReqCommand';

export class ReqGetSong extends Req {
  constructor(hash: string) {
    super(ReqCommand.GET_SONG, hash);
  }
}
