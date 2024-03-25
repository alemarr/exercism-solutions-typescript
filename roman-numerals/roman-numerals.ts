const numbersMap = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  LX: 60,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  VIII: 8,
  V: 5,
  IV: 4,
  I: 1
};

export const toRoman = (input: number): string => {
  let roman = "";
  Object.entries(numbersMap).forEach(([romanNumber, decimal]) => {
    while (Number(decimal) <= input) {
      input = input - Number(decimal);
      roman += romanNumber;
    }
  });
  return roman;
};