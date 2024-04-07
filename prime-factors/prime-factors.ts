export function calculatePrimeFactors(n: number): number[] {
  const factors: number[] = [];
  let divisor = 2;
  
  while (n > 1) {
    if (n % divisor != 0) {
      divisor++;
      continue;
    }

    factors.push(divisor);
    n = n / divisor;
  }

  return factors;
};
