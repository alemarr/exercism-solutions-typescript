export function encode(input: string) {
  return input.replace(/(.)\1+/g, (matches, char) => matches.length + char);
}

export function decode(input: string) {
  return input.replace(/(\d+)(.)/g, (_matches, count, char) => char.repeat(count));
}
