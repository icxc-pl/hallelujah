import { SongMeta } from './SongMeta';
import { SongMetaType } from './SongMetaType';
import { SongMetaUrlType } from './SongMetaUrlType';

export class SongMetaUrl extends SongMeta {
  urlType: SongMetaUrlType;

  constructor(urlType: SongMetaUrlType, url: string) {
    super(SongMetaType.URL, url);
    this.urlType = urlType;
  }
}
