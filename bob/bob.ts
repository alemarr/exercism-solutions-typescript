export const hey = (message: string) => {
  switch (true) {
    case isEmpty(message):
      return `Fine. Be that way!`;
    case isQuestion(message) && isYell(message):
      return `Calm down, I know what I'm doing!`;
    case isQuestion(message):
      return "Sure.";
    case isYell(message):
      return `Whoa, chill out!`;
    default:
      return `Whatever.`;
  }
};

const isEmpty = (message: string) => {
  return message.trim() === "";
};

const isYell = (message: string) => {
  return (
    message.trim().toUpperCase() == message && /[A-Z]/.test(message.trim())
  );
};

const isQuestion = (message: string) => {
  return message.trim().substring(message.trim().length - 1) == "?";
};
