export class Bowling {
  private readonly _initialFrame: Frame;
  
  constructor() {
    this._initialFrame = new Frame(false);
    let current = this._initialFrame;
    Array.from({ length: 9 }).map((_, idx) => {
      const frame = new Frame(idx + 1 === 9);
      current.setNext(frame);
      frame.setPrevious(current);
      current = frame;
    });
  }

  public roll(pins: number): void {
    let current = this._initialFrame;
    while (current.isComplete() && current?.next() !== undefined) {
      current = current.next()!;
    }

    if (pins === 10) {
      current?.addStrike(pins);
    }

    if (pins < 10) {
      current?.addOpen(pins);
    }
  }

  public score(): number {
    let score = this._initialFrame.score();
    let current = this._initialFrame;
    while (current?.next() !== undefined) {
      current = current.next()!;
      score += current.score();
    }

    return score;
  }
}

type Tabulation = "Strike" | "Spare" | "Open";

class Frame {
  private _rolls: number[] = [];
  private _tabulation?: Tabulation;
  private _next?: Frame;
  private _previous?: Frame;

  constructor(private readonly _isLast: boolean) {}

  public tabulation(): Tabulation | undefined {
    return this._tabulation;
  }

  public next(): Frame | undefined {
    return this._next;
  }

  public previous(): Frame | undefined {
    return this._previous;
  }

  public setNext(next: Frame): void {
    this._next = next;
  }

  public setPrevious(previous: Frame): void {
    this._previous = previous;
  }

  private addRoll(roll: number): void {
    this._rolls.push(roll);
  }
  
  public addStrike(roll: number): void {
    this._tabulation = "Strike";
    this.addRoll(roll);
  }

  public addOpen(roll: number): void {
    this.addRoll(roll);
    if (this.isComplete() && this._rolls[0] + this._rolls[1] === 10) {
      this._tabulation = "Spare";
    } else {
      this._tabulation = "Open";
    }
  }

  public score(): number {
    return this.getScoreForRolls();
  }

  private getScoreForRolls(): number {
    const roll = this._rolls[0] ?? 0;
    const nextRoll = this._rolls[1] ?? 0;
    switch (true) {
      case this._previous?.tabulation() === "Spare":
        return roll * 2 + nextRoll;
      case this._isLast && this.tabulation() === "Spare":
        return roll * 2 + nextRoll;
      case this._previous?.tabulation() === "Strike":
        return roll * 2 + nextRoll * 2;
      case this.tabulation() === "Strike":
        return roll;
      default:
        return roll + nextRoll;
    }
  }

  public isComplete(): boolean {
    return this._rolls.length >= 2 || this._tabulation === "Strike";
  }
}
