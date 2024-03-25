// type DnaNucleotides = "G" | "C" | "T" | "A";
// type RnaNucleotides = "C" | "G" | "A" | "U";

const strandMap: Map<string, string> = new Map([
  ["G", "C"],
  ["C", "G"],
  ["T", "A"],
  ["A", "U"],
]);

export const toRna = (strand: string) => {
  const rna = strand
    .split("")
    .map((letter) => {
      if (!strandMap.has(letter)) {
        throw new Error("Invalid input DNA.");
      }
      return strandMap.get(letter);
    })
    .join("");

  return rna;
};
