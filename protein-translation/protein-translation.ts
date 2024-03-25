type Protein =
  | "Methionine"
  | "Phenylalanine"
  | "Leucine"
  | "Serine"
  | "Tyrosine"
  | "Cysteine"
  | "Tryptophan"
  | "STOP";
type Codon =
  | "AUG"
  | "UUU"
  | "UUC"
  | "UUA"
  | "UUG"
  | "UCU"
  | "UCC"
  | "UCA"
  | "UCG"
  | "UAU"
  | "UAC"
  | "UGU"
  | "UGC"
  | "UGG"
  | "UAA"
  | "UAG"
  | "UGA";

const map = new Map<Codon, Protein>([
  ["AUG", "Methionine"],
  ["UUU", "Phenylalanine"],
  ["UUC", "Phenylalanine"],
  ["UUA", "Leucine"],
  ["UUG", "Leucine"],
  ["UCU", "Serine"],
  ["UCC", "Serine"],
  ["UCA", "Serine"],
  ["UCG", "Serine"],
  ["UAU", "Tyrosine"],
  ["UAC", "Tyrosine"],
  ["UGU", "Cysteine"],
  ["UGC", "Cysteine"],
  ["UGG", "Tryptophan"],
  ["UAA", "STOP"],
  ["UAG", "STOP"],
  ["UGA", "STOP"],
]);

const failIfNotCodon = (value: Codon): void => {
  if (!map.has(value)) {
    throw new Error("Invalid codon");
  }
};

export function translate(rna: string): Protein[] {
  const proteins: Protein[] = [];

  const codons = rna.match(/([A-Z]){1,3}/g) ?? [];
  for (const codon of codons) {
    failIfNotCodon(codon as Codon);

    const protein = map.get(codon as Codon);
    if (protein) {
      if (protein === "STOP") {
        break;
      }
      proteins.push(protein);
    }
  }

  return proteins;
}
