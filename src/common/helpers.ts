import latinize from 'latinize';

const NON_ALPHANUMERIC = /[^a-z0-9 ]/ig;

export function normalizeText(text: string): string {
  return latinize(text.replace(NON_ALPHANUMERIC, '').toLocaleLowerCase());
}
