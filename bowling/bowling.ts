export class Bowling {
  private _score: number = 0;
  private readonly _frames: Frame[] = [];

  constructor() {
    this._frames = Array.from({ length: 10 }).map(() => {
      return new Frame();
    });
  }

  public roll(pins: number): void {
    const currentIdx = this._frames.findIndex((frame: Frame) => !frame.isComplete());
    const current = this._frames[currentIdx];

    if (pins === 10) {
      current.addStrike(pins);
    }

    if (pins < 10) {
      current.addOpen(pins);
    }
  }

  public score(): number {
    return this._frames.reduce((acc, frame) => {
      acc += frame.score();
      return acc;
    }, 0)
  }
}

type Tabulation = "Strike" | "Spare" | "Open";

class Frame {
  private _rolls: number[] = [];
  private _tabulation: Tabulation;

  private addRoll(roll: number): void {
    this._rolls.push(roll);
  }
  
  public addStrike(roll: number): void {
    this._tabulation = "Strike";
    this.addRoll(roll);
  }

  public addOpen(roll: number): void {
    this.addRoll(roll);
    if (this.isComplete() && this.score() === 10) {
      this._tabulation = "Spare";
    } else {
      this._tabulation = "Open";
    }
  }

  public score(): number {
    return this._rolls.reduce((acc, roll) => {
      acc += roll;
      return acc;
    }, 0)
  }

  public isComplete(): boolean {
    return this._rolls.length >= 2 || this._tabulation === "Strike";
  }
}
