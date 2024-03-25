export function isArmstrongNumber(n: number | BigInt): boolean {
  const digits = n
    .toString()
    .split("")
    .map((digit) => Number(digit));

  const exponent = digits.length;

  const sum = digits.map(BigInt).reduce((acc, digit) => {
    return acc + digit ** BigInt(exponent);
  }, BigInt(0));

  return sum === BigInt(n.toString());
}
