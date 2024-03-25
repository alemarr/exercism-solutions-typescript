export const isIsogram = (sentence: string): boolean => {
  const onlyLetters = sentence.toLowerCase().replace(/[^a-z]/g, "");

  const letters: number[] = [];
  try {
    for (const [i, letter] of onlyLetters.split("").entries()) {
      const charCode = onlyLetters.charCodeAt(i);
      const letterIsRepeated = letters.includes(charCode);
      if (letterIsRepeated) {
        throw new Error("Duplicated character.");
      }
      letters.push(charCode);
    }
  } catch (err) {
    return false;
  }

  return true;
};
