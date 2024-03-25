export const classify = (input: number): string => {
  if (input <= 0) {
    throw new Error("Classification is only possible for natural numbers.");
  }
  const factors = getFactors(input);

  return getClassification(input, sumFactors(factors));
};

const getClassification = (input: number, sum: number): string => {
  if (sum == input) return `perfect`;
  if (sum > input) return `abundant`;
  return `deficient`;
};

const getFactors = (input: number): number[] => {
  return Array.from({ length: input }, (_, idx) => idx).filter(
    (value: number) => {
      return input % value === 0;
    }
  );
};

const sumFactors = (factors: number[]) => {
  return factors.reduce((acc, factor) => {
    acc += factor;
    return acc;
  }, 0);
};
