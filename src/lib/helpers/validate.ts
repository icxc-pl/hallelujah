export function normalizeTitle(title: string) {
  return title.replace(/[\x00-\x1f\x22\x24-\x27\x3c-\x3e]+/g, '').trim();
}

export function validateTitle(title: string) {
  return title.length > 0 && title.length <= 100;
}
