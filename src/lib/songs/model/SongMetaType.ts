enum SongMetaType {
  AUTHOR = 'author',
  URL = 'url',
  ORIGINAL_TILE = 'original-title',
  ALTERNATIVE_TILE = 'alternative-title',
  ALBUM = 'album',
  COPYRIGHT = 'copyright',
  TRANSLATION = 'translation',
  BASED_ON = 'based-on',
  LYRICS = 'lyrics',
  MUSIC = 'music'
}

function findEnum(needle: string): SongMetaType {
  type SongMetaTypeKey = keyof typeof SongMetaType;
  for (const [key, value] of Object.entries(SongMetaType)) {
    if (value == needle) {
      return SongMetaType[key as SongMetaTypeKey];
    }
  }

  throw new Error(`Couldn't find enum matching '${needle}'`);
}

export { SongMetaType, findEnum };
