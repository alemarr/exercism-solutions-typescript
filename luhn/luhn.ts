export const valid = (input: string): boolean => {
  const digits = input
    .replace(/\s/g, "")
    .split("")
    .map((n) => Number(n));

  if (digits.length <= 1) {
    return false;
  }

  for (let idx = digits.length - 2; idx >= 0; idx -= 2) {
    let doubleDigit = digits[idx] * 2;

    if (doubleDigit > 9) {
      doubleDigit -= 9;
    }

    digits[idx] = doubleDigit;
  }

  const sum = digits.reduce((acc, digit) => {
    acc += digit;
    return acc;
  }, 0)

  return sum % 10 === 0;
};
