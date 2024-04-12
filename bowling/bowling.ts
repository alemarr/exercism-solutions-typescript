export class Bowling {
  private _score: number = 0;

  public roll(pins: number): void {
    this._score += pins;
  }

  public score(): unknown {
    return this._score;
  }
}
