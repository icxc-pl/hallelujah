export abstract class SongUrl {
  static BEGINING = 'url-';

  static isFamily(key: string): boolean {
    return key.startsWith(this.BEGINING);
  }

  url: string;

  constructor(url: string) {
    this.url = url;
  }
}
