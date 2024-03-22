import { Req } from '@/lib/requests/Req';
import { ReqCommand } from '@/lib/requests/ReqCommand';

export class ReqListPlaylistsWithoutSong extends Req {
  constructor(hash: string) {
    super(ReqCommand.LIST_PLAYLISTS_WITHOUT_SONG, hash);
  }
}
