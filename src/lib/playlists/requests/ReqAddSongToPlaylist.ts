import { Req } from '@/lib/requests/Req';
import { ReqCommand } from '@/lib/requests/ReqCommand';

export class ReqAddSongToPlaylist extends Req {
  constructor(playlistId: number, songHash: string) {
    super(ReqCommand.ADD_SONG_TO_PLAYLIST, [playlistId, songHash]);
  }
}
