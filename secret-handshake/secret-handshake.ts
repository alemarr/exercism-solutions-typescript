const COMMANDS = [
  'wink', 
  'double blink',
  'close your eyes',
  'jump'
];

const REVERSE_COMMAND = 16;

export const commands = (command: number) => {
  let secret = COMMANDS.filter((_, i) => command & (1 << i));
  if (command & REVERSE_COMMAND) {
    secret = secret.reverse();
  }
  return secret;
};