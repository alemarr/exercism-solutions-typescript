type Divider = 3 | 5 | 7;
type Sound = "Pling" | "Plang" | "Plong";

const soundsMap = new Map<Divider, Sound>([
  [3, "Pling"],
  [5, "Plang"],
  [7, "Plong"],
]);

export function convert(input: number): string {
  let converted: string = "";
  soundsMap.forEach((sound, divider) => {
    if (input % divider === 0) {
      converted += sound;
    }
  });

  if (converted.length === 0) {
    return input.toString();
  }

  return converted;
}
