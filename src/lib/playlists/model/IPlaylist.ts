export interface IPlaylist {
  id?: number;
  uuid: string;
  title: string;
  color: string | null;
  songsUuids: string[];
}
