import { Req } from '@/lib/requests/Req';
import { ReqCommand } from '@/lib/requests/ReqCommand';

export class ReqRemoveSongFromPlaylist extends Req {
  constructor(playlistId: number, songHash: string) {
    super(ReqCommand.REMOVE_SONG_FROM_PLAYLIST, [playlistId, songHash]);
  }
}
