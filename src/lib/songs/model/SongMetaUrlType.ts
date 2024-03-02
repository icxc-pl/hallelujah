enum SongMetaUrlType {
  YOUTUBE = 'youtube',
  SPOTIFY = 'spotify'
}

function findEnum(needle: string): SongMetaUrlType {
  type SongMetaUrlTypeKey = keyof typeof SongMetaUrlType;
  for (const [key, value] of Object.entries(SongMetaUrlType)) {
    if (value == needle) {
      return SongMetaUrlType[key as SongMetaUrlTypeKey];
    }
  }

  throw new Error(`Couldn't find enum matching '${needle}'`);
}

export { SongMetaUrlType, findEnum };
