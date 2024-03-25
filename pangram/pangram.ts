const TOTAL_CHARS = 26;

export const isPangram = (sentence: string): boolean => {
  const onlyAlphabeticChars = sentence
    .toLowerCase()
    .replace(/([^a-z])/g, "")
    .split("");

  onlyAlphabeticChars.sort();

  const uniqueChars = onlyAlphabeticChars.join("").replace(/(.+)(?=\1)/g, "");
  const containsAllLetters = uniqueChars.length == TOTAL_CHARS;

  return containsAllLetters;
};
