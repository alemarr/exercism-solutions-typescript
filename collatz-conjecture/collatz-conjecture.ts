export function steps(count: number): number {
  let stepsCount = 0;

  if (isNegativeOrZero(count) || !isInteger(count)) {
    throw new Error("Only positive integers are allowed");
  }

  while (count > 1) {
    count = isEven(count) ? count / 2 : count * 3 + 1;
    stepsCount++;
  }

  return stepsCount;
}

const isNegativeOrZero = (n: number) => n <= 0; 
const isInteger = (n: number) => n % 1 === 0;
const isEven = (n: number) => n % 2 === 0;
