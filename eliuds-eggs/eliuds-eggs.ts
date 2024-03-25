export const eggCount = (displayValue: number): number => {
  return displayValue
    .toString(2)
    .split("")
    .reduce((acc: number, eggPosition: string): number => {
      acc += Number(eggPosition);
      return acc;
    }, 0);
};
