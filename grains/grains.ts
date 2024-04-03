const SUBSTRACT_FROM_POSITION = 1;
const MIN_SQUARE = 1;
const MAX_SQUARE = 64;

export const square = (position: number) => {
  if (!(position >= MIN_SQUARE) || !(position <= MAX_SQUARE)) {
    throw new Error('square must be between 1 and 64');
  }

  const exponent = position - SUBSTRACT_FROM_POSITION;
  const result = BigInt(Math.pow(2, exponent));

  return result;
};

export const total = () => {
  return BigInt(Math.pow(2, MAX_SQUARE)) - 1n;
};