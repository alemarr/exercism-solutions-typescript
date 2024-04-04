export function sum(points: number[], level: number): number {
  const multiples: number[] = [];

  for (let i = 1; i < level; i++) {
    for (const point of points) {
      if (isGreaterThanZero(point) && isDivisibleByPoint(i, point)) {
        multiples.push(i);
      }
    }
  }

  return multiples.filter(getUniqueMultiples).reduce((acc, multiple) => {
    acc += multiple;
    return acc;
  }, 0);
}

const isGreaterThanZero = (point: number) => point > 0;
const isDivisibleByPoint = (n: number, point: number) => n % point === 0;
const getUniqueMultiples = (multiple: number, idx: number, multiples: number[]) => {
  return multiples.indexOf(multiple) === idx;
}
