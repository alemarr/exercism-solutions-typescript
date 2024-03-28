type Nucleotide = "A" | "C" | "G" | "T";
type Count = Record<Nucleotide, number>;

export function nucleotideCounts(dna: string) {
  if (!isValidDnaSequence(dna)) {
    throw new Error("Invalid nucleotide in strand");
  }
  
  const count: Count = { A: 0, C: 0, G: 0, T: 0 };

  dna.split("").forEach((nucletoide: string) => {
    count[nucletoide as Nucleotide]++;
  });

  return count;
}

const isValidDnaSequence = (dna: string) => dna.match(/^[ACTG]*$/);
