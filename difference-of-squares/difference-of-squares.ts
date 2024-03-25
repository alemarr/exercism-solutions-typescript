export class Squares {
  constructor(private number: number) {}

  get sumOfSquares(): number {
    return this.getNumbers().reduce((acc, value) => {
      acc += this.squareOf(value);
      return acc;
    }, 0);
  }

  get squareOfSum(): number {
    const sum = this.getNumbers().reduce((acc, value) => acc + value, 0);
    return this.squareOf(sum);
  }

  get difference(): number {
    return this.squareOfSum - this.sumOfSquares; 
  }

  private squareOf(number: number): number {
    return Math.pow(number, 2);
  }

  private getNumbers(): number[] {
    return (new Array(this.number))
      .fill(1)
      .map((number, index) => {
        return number + index;
    });
  }
}