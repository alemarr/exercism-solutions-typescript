const calculator = {
  plus: (a: number, b: number) => a + b,
  minus: (a: number, b: number) => a - b,
  multiplied: (a: number, b: number) => a * b,
  divided: (a: number, b: number) => a / b,
};
type CalculatorOperation = keyof typeof calculator;

const validator = {
  isNumber: function (value: string) {
    return /\d+/.test(value);
  },
  isValidOperator: function (operator: string) {
    if (this.isNumber(operator)) {
      throw new Error("Syntax error");
    }
  },
  isSupportedOperation: function (operation: CalculatorOperation) {
    if (!calculator[operation]) {
      throw new Error("Unknown operation");
    }
  },
  isSet: function (value: string) {
    if (value === undefined) {
      throw new Error("Syntax error");
    }
  },
  isValidQuestion: function (question: string) {
    if (question.length === 0) {
      throw new Error("Syntax error");
    }
  },
  validateOperation: function (operator: CalculatorOperation) {
    this.isValidOperator(operator);
    this.isSupportedOperation(operator);
  },
  validateOperand: function (operand: string) {
    validator.isSet(operand);
    validator.isNumber(operand);
  },
  validateFullOperation: function (
    left: string,
    right: string,
    operator: CalculatorOperation
  ) {
    this.validateOperation(operator);
    this.validateOperand(left);
    this.validateOperand(right);
  },
};

const calculate = (
  left: string,
  right: string,
  operation: CalculatorOperation
) => {
  validator.validateFullOperation(left, right, operation);
  return calculator[operation](parseInt(left), parseInt(right));
};

const getEquationString = (question: string) => {
  question = question.replace(/What is|\?|by/gi, "");
  validator.isValidQuestion(question);
  return question.replace(/\s+/g, " ").trim().split(" ");
};

export const answer = (question: string) => {
  let answer = 0,
    left: string,
    right: string,
    operation: CalculatorOperation;

  const equation = getEquationString(question);
  left = equation[0];

  for (let i = 1; i < equation.length; i += 2) {
    operation = equation[i] as CalculatorOperation;
    right = equation[i + 1];
    answer = calculate(left, right, operation);
    left = answer.toString();
  }

  if (!answer) {
    answer = Number(equation[0]);
  }

  return answer;
};
