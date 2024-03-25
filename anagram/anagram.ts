export class Anagram {
  constructor(private word: string) {}

  matches(...potentials: string[]): string[] {
    const sorted = this.word.toLowerCase()
      .split('')
      .sort()
      .join('');

    const output: string[] = [];

    potentials.forEach(word => {
      if (word.toLowerCase() == this.word.toLowerCase()) {
        return;
      }
      const reversedWord = word.toLowerCase()
        .split('')
        .sort()
        .join('');

      if (reversedWord == sorted) {
        output.push(word);
      }
    });

    return output;
  }
}