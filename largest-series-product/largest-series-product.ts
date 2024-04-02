const validateAndThrow = (input: string, series: number) => {
  if (!/^\d*$/.test(input)) {
    throw new Error("Digits input must only contain digits");
  }

  if (series < 0) {
    throw new Error("Span must not be negative");
  }

  if (series > input.length) {
    throw new Error("Span must be smaller than string length");
  }
};

export const largestProduct = (input: string, series: number) => {
  let largestProduct = 0;
  const limit = input.length - series;
  if (series === 0) {
    return 1;
  }

  validateAndThrow(input, series);

  for (let i = 0; i <= limit; i++) {
    let numbers = input.substring(i, i + series);
    let product = 1;

    numbers.split("").forEach((n) => {
      product *= Number(n);
    });

    largestProduct = largestProduct < product ? product : largestProduct;
  }

  return largestProduct;
};
