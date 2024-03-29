export enum ReqCommand {
  GET_SONG = 'GET_SONG',
  LIST_SONGS = 'LIST_SONGS',
  SEARCH_SONGS = 'SEARCH_SONGS',
  
  GET_PLAYLIST = 'GET_PLAYLIST',
  LIST_PLAYLIST_SONGS = 'LIST_PLAYLIST_SONGS',
  LIST_PLAYLISTS = 'LIST_PLAYLISTS',
  LIST_PLAYLISTS_WITHOUT_SONG = 'LIST_PLAYLISTS_WITHOUT_SONG',
  CREATE_PLAYLIST = 'CREATE_PLAYLIST',
  DELETE_PLAYLIST = 'DELETE_PLAYLIST',
  UPDATE_PLAYLIST = 'UPDATE_PLAYLIST',

  ADD_SONG_TO_PLAYLIST = 'ADD_SONG_TO_PLAYLIST',
  REMOVE_SONG_FROM_PLAYLIST = 'REMOVE_SONG_FROM_PLAYLIST'
}
