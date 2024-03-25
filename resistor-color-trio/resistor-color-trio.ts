const ONE_THOUSAND = 1000;
const ONE_MILLION = 1000000;
const ONE_BILLION = 1000000000;

const colorsMap = {
  black: 0,
  brown: 1,
  red: 2,
  orange: 3,
  yellow: 4,
  green: 5,
  blue: 6,
  violet: 7,
  grey: 8,
  white: 9,
};

const units = {
  [ONE_BILLION]: "gigaohms",
  [ONE_MILLION]: "megaohms",
  [ONE_THOUSAND]: "kiloohms",
};

const getOutput = (n: number): string => {
  let _unit = "ohms";
  let _value = n;
  Object.entries(units).forEach(([ value, unit ]) => {
    if (n >= Number(value)) {
      _unit = unit;
      _value = n / Number(value);
    }
  });

  return `${_value} ${_unit}`;
};

export function decodedResistorValue(
  colors: (keyof typeof colorsMap)[]
): string {
  const resistorOne = colorsMap[colors[0]];
  const resistorTwo = colorsMap[colors[1]];
  const resistorThree = colorsMap[colors[2]];

  const resistance = parseInt(`${resistorOne}${resistorTwo}`) * Math.pow(10, resistorThree);

  return getOutput(resistance);
}
