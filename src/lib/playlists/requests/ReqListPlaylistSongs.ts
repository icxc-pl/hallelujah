import { Req } from '@/lib/requests/Req';
import { ReqCommand } from '@/lib/requests/ReqCommand';

export class ReqListPlaylistSongs extends Req {
  constructor(id: number) {
    super(ReqCommand.LIST_PLAYLIST_SONGS, id);
  }
}
