const scores = {
  d: 2,
  g: 2,
  b: 3,
  c: 3,
  m: 3,
  p: 3,
  f: 4,
  h: 4,
  v: 4,
  w: 4,
  y: 4,
  k: 5,
  j: 8,
  x: 8,
  q: 10,
  z: 10,
};
type ScoreKey = keyof typeof scores;

export function score(word: string = "") {
  let letters = word.toLowerCase().split("");

  let score = 0;
  letters.forEach((letter: string) => {
    score += scores[letter as ScoreKey] ?? 1;
  });

  return score;
}
