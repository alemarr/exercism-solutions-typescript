export class DiffieHellman {
  constructor(private _p: number, private _g: number) {
    if (!isPrime(this._p) || !isPrime(this._g)) {
      throw new Error("Input is not a prime number");
    }
  }

  public getPublicKey(privateKey: number): number {
    if (privateKey < 2 || privateKey >= this._p) {
      throw Error("Invalid private key.");
    }
    return Math.pow(this._g, privateKey) % this._p;
  }

  public getSecret(theirPublicKey: number, myPrivateKey: number): number {
    return Math.pow(theirPublicKey, myPrivateKey) % this._p;
  }
}

const isPrime = (num: number) => {
  for (var i = 2; i < num; i++) if (num % i === 0) return false;
  return num > 1;
};
