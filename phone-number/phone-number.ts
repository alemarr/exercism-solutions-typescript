const MINIMUM_LENGTH = 10;
const MAXIMUM_LENGTH = 11;
const COUNTRY_CODE = 1;

export const clean = (phoneNumber: string) => {
  checkIfHasLetters(phoneNumber);
  checkIfHasSpecialCharacters(phoneNumber);

  const sanitized = phoneNumber.replace(/\D/g, "");

  validateLength(sanitized);
  validateFormat(sanitized);

  const numberWithoutCountryCode = sanitized.slice(MINIMUM_LENGTH * -1);

  return numberWithoutCountryCode;
};

const checkIfHasLetters = (phoneNumber: string) => {
  if (/[a-zA-Z]/.test(phoneNumber)) {
    throw new Error("Letters not permitted");
  }
};

const checkIfHasSpecialCharacters = (phoneNumber: string) => {
  const withoutValidCharacters = phoneNumber.replace(/[ +()-.]/g, "");
  if (/\D/.test(withoutValidCharacters)) {
    throw new Error("Punctuations not permitted");
  }
};

const validateLength = (phoneNumber: string) => {
  if (phoneNumber.length < MINIMUM_LENGTH) {
    throw new Error("Incorrect number of digits");
  }

  if (phoneNumber.length > MAXIMUM_LENGTH) {
    throw new Error("More than 11 digits");
  }
};

const validateAreaCode = (areaCode: string) => {
  switch (areaCode.charAt(0)) {
    case "0":
      throw new Error("Area code cannot start with zero");
    case "1":
      throw new Error("Area code cannot start with one");
  }
};

const validateExchangeCode = (exchangeCode: string) => {
  switch (exchangeCode.charAt(0)) {
    case "0":
      throw new Error("Exchange code cannot start with zero");
    case "1":
      throw new Error("Exchange code cannot start with one");
  }
};

const validateFormat = (phoneNumber: string) => {
  let areaCode = "";
  let exchangeCode = "";

  switch (phoneNumber.length) {
    case MAXIMUM_LENGTH:
      if (phoneNumber.charAt(0) !== COUNTRY_CODE.toString()) {
        throw new Error("11 digits must start with 1");
      }

      areaCode = phoneNumber.substring(1, 4);
      exchangeCode = phoneNumber.substring(4, 7);
      break;
    case MINIMUM_LENGTH:
      areaCode = phoneNumber.substring(0, 3);
      exchangeCode = phoneNumber.substring(3, 6);
      break;
  }

  validateAreaCode(areaCode);
  validateExchangeCode(exchangeCode);
};
