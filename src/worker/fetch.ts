const SONGS_FILE = '/songs.md';

export async function fetchLastModified() {
  const res = await fetch(SONGS_FILE, { method: 'HEAD' });
  return res.headers.get('Last-Modified');
}

export async function fetchSongsFile() {
  const res = await fetch(SONGS_FILE);
  return res.text();
}
