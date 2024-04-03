const PATTERN = /^[AEIOUaeiou]|^(xr|yt)+/;
const GROUPS = /^(ch|squ|qu|thr|th|sch)+/;

export const translate = (word: string): string => {
  const words = word.split(" ");
  if (words.length == 1) {
    return transformWord(word);
  }

  return words.map((word: string) => transformWord(word)).join(" ");
};

const transformWord = (word: string): string => {
  // If $word doesn't match a vowel or a vowel sound
  if (!word.match(PATTERN)) {
    // Check if it matches some group of letters
    const matches = word.match(GROUPS);
    if (matches?.length) {
      const match = matches[0];
      word = moveMatch(word, match);
    } else {
      // If it doesn't match any of the validations,
      // move the first letter to the end of the word.
      const char = word.substring(0, 1);
      word = moveMatch(word, char);
    }
  }

  return `${word}ay`;
};

const moveMatch = (word: string, match: string): string => {
  const prefix = word.substring(0, match.length);
  word = word.replace(prefix, "");
  word += match;
  return word;
};
