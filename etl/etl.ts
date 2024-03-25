type Input = {
  [key: string]: string[];
};

type Output = {
  [key: string]: number;
};

export function transform(input: Input): Output {
  const transformed: Output = {};
  Object.entries(input).forEach(([key, value]) =>
    value.forEach((letter) => (transformed[letter.toLowerCase()] = Number(key)))
  );

  return transformed;
}
