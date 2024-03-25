export const parse = (phrase: string): string => {
  let acronym = "";
  const matches = phrase.match(/[A-Z]+[a-z]*|[a-z]+/g) || [];

  matches.forEach((match) => acronym += match.charAt(0).toUpperCase())

  return acronym;
};
