export function count(words: string) {
  const counts = new Map<String, number>();

  const regex = /\b([\w']+)\b/g;

  words
    .trim()
    .toLowerCase()
    .match(regex)
    ?.forEach((word: string) => {
      counts.set(word, (counts.get(word) ?? 0) + 1);
    });

  return counts;
}
