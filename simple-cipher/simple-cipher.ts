const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
const INITIAL_CHAR_CODE = "a".charCodeAt(0);

type DIRECTION = "encode" | "decode";

export class SimpleCipher {
  private _key: string;

  constructor(key?: string) {
    this.validateKey(key);

    this._key = key || this.generateRandomKey();
  }

  get key(): string {
    return this._key;
  }

  validateKey(key?: string): void {
    if (key && !key.match(/^[a-z]+$/)) {
      throw new Error("Bad key");
    }
  }

  generateRandomKey(): string {
    let randomKey = "";

    for (let i = 0; i < 100; i++) {
      const randomIndex = Math.floor(Math.random() * 26);
      randomKey += ALPHABET[randomIndex];
    }

    return randomKey;
  }

  rotate(letterCode: number, rotationCode: number) {
    var newCode = (letterCode + rotationCode) % 26;
    return String.fromCharCode(newCode + 97);
  }

  private transform(text: string, direction: DIRECTION) {
    return text
      .split("")
      .map((_: string, index: number) => {
        let currentIndex = text.charCodeAt(index);
        let keyIndex = this._key.charCodeAt(index % this._key.length);

        var shift = keyIndex - INITIAL_CHAR_CODE;

        if (direction === "decode") {
          shift = ALPHABET.length - shift;
        }
        return this.rotate(currentIndex - INITIAL_CHAR_CODE, shift);
      })
      .join("");
  }

  encode(plainText: string): string {
    return this.transform(plainText, "encode");
  }

  decode(cipher: string): string {
    return this.transform(cipher, "decode");
  }
}
