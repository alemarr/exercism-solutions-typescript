export function transpose(input: string[]) {
  if (input.length === 0) {
    return [];
  }

  const output: string[] = [];
  input.forEach((phrase, column) => {
    [...phrase].forEach((character, row) => {
      if (!output[row]) {
        output[row] = '';
      }
      const diff = column - output[row].length;
      output[row] += diff > 0 ? ' '.repeat(diff) + character : character;
    });
  });

  return output;
};
