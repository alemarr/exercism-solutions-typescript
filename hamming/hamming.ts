const compute = (left: string, right: string) : number => {
  if (left.length !== right.length) {
    throw new Error('DNA strands must be of equal length.');
  }

  return left.split('')
      .reduce((acc, strand, idx) => {
        return strand === right[idx] ? acc : acc += 1;
      }, 0);
}

export { compute };
