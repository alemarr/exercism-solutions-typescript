type Dictionary = Record<number, string>;

const dictionary: Dictionary = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven",
  12: "twelve",
  13: "thirteen",
  14: "fourteen",
  15: "fifteen",
  16: "sixteen",
  17: "seventeen",
  18: "eighteen",
  19: "nineteen",
  20: "twenty",
  30: "thirty",
  40: "forty",
  50: "fifty",
  60: "sixty",
  70: "seventy",
  80: "eighty",
  90: "ninety",
};

const MIN_INPUT = 0;
const MAX_INPUT = 999999999999;

const MAX_CHUNK_SIZE = 100;
const ONE_THOUSAND = 1000;
const ONE_MILLION = 1000000;
const ONE_BILLION = 1000000000;
const ONE_TRILLION = 1000000000000;

class Input {
  private _number: number = -1;

  constructor(n: number) {
    this.setNumber(n);
  }

  public getNumber(): number {
    return this._number;
  }

  private setNumber(n: number): void {
    if (n < MIN_INPUT || n > MAX_INPUT) {
      throw new Error("Number must be between 0 and 999,999,999,999.");
    }
    this._number = n;
  }
}

class Parser {
  constructor() {}

  private getRest (n: number): string  {
    return n ? this.parseNumber(n) : "";
  }

  private getThousand(n: number): string {
    return n ? `${this.parseNumber(n)} thousand` : "";
  }

  private getMillion(n: number): string {
    return n ? `${this.parseNumber(n)} million` : "";
  }

  private getBillion(n: number): string {
    return n ? `${this.parseNumber(n)} billion` : "";
  }

  public parse(extract: Extract): string {
    return [this.getBillion(extract.getBillions()), this.getMillion(extract.getMillions()), this.getThousand(extract.getThousands()), this.getRest(extract.getRest())].join(" ").trim().replace(/\s+/g, " ");
  }

  private parseNumber(n: number): string {
    let main, mod: number;
    main = parseInt((n / MAX_CHUNK_SIZE).toString());
    mod = n % MAX_CHUNK_SIZE;

    if (main >= 1) {
      return mod
          ? `${dictionary[main]} hundred ${this.parseNumber(mod)}`
          : `${dictionary[main]} hundred`;
    }

    if (dictionary[mod]) {
      return `${dictionary[mod]}`;
    }

    main = parseInt((n / 10).toString());
    mod = n % 10;

    return `${dictionary[main * 10]}-${dictionary[mod]}`
  };
}

class Extractor {
  private _input: Input;

  constructor(input: Input) {
    this._input = input;

    this.extract();
  }

  public extract(): Extract {
    let acc = this._input.getNumber();

    const rest = acc % ONE_THOUSAND;
    acc -= rest;

    const thousands = acc % ONE_MILLION;
    acc -= thousands;

    const millions = acc % ONE_BILLION;
    acc -= millions;

    const billions = acc % ONE_TRILLION;

    return new Extract(billions, millions, thousands, rest);
  }
}

class Extract {
  constructor(private _billions: number, private _millions: number, private _thousands: number, private _rest: number) {}

  public getBillions(): number {
    return this._billions / ONE_BILLION;
  }

  public getMillions(): number {
    return this._millions / ONE_MILLION;
  }

  public getThousands(): number {
    return this._thousands / ONE_THOUSAND;
  }

  public getRest(): number {
    return this._rest;
  }
}

export function sayInEnglish(n: number): string {
  const input = new Input(n);

  if (dictionary[input.getNumber()]) {
    return dictionary[input.getNumber()];
  }

  const extractor = new Extractor(input);
  const extract = extractor.extract();
  const parser = new Parser();

  return parser.parse(extract);
}
