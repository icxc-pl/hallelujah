import { SongMeta } from '../model/SongMeta';
import { SongMetaUrl } from '../model/SongMetaUrl';
import {
  SongMetaType,
  findEnum as findMetaTypeEnum
} from '../model/SongMetaType';
import { findEnum as findMetaUrlTypeEnum } from '../model/SongMetaUrlType';

const REGEXP: RegExp =
  /^> meta\/(?<type>[^:/]+)(?:\/(?<subtype>[^:]+))?: *(?<value>.+)$/;

export class SongMetaFactory {
  static processLine(line: string): SongMeta {
    const match: RegExpMatchArray | null = line.match(REGEXP);
    if (match == null || !match.groups) {
      throw new Error(`Error parsing song meta line: ${line}`);
    }

    return this.create(
      match.groups.type,
      match.groups.subtype,
      match.groups.value
    );
  }

  static create(type: string, subtype: string, value: string): SongMeta {
    const metaType: SongMetaType = findMetaTypeEnum(type);

    if (typeof subtype != 'undefined') {
      switch (metaType) {
        case SongMetaType.URL:
          return new SongMetaUrl(findMetaUrlTypeEnum(subtype), value);

        default:
          throw new Error(`Type ${metaType} cannot have a subtype`);
      }
    }

    return new SongMeta(metaType, value);
  }
}
