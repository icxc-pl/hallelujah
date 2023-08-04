import latinize from 'latinize';

export function normalizeText(text: string): string {
  return latinize(text.trim().toLocaleLowerCase());
}
