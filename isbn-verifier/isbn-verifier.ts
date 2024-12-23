const VALID_ISBN_REGEX = /^(?:\d[-]*){9}[\dX]$/;
const ISBN_LENGTH = 10;

export function isValid(isbn: string): boolean {
  if (!VALID_ISBN_REGEX.test(isbn)) {
    return false;
  }

  isbn = isbn.replace(/[-]/g, "");

  const accumulated = isbn.split("").reduce((acc: number, currentDigit: string, currentIndex: number) => {
    const digit = currentDigit === "X" ? 10 : Number(currentDigit);
    const multiplier = ISBN_LENGTH - currentIndex;
    acc += (digit * multiplier);
    return acc;
  }, 0);

  return accumulated % 11 === 0;
}
