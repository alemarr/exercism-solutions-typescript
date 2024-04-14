const MAXIMUM_NUMBER_OF_PINS = 10;

export class Bowling {
  private readonly _initialFrame: Frame;

  constructor() {
    this._initialFrame = new Frame(false);
    let current = this._initialFrame;
    Array.from({ length: 9 }).map((_, idx) => {
      const isLast = idx + 1 === 9;
      const frame = new Frame(isLast);
      current.setNext(frame);
      frame.setPrevious(current);
      current = frame;
    });
  }

  public roll(pins: number): void {
    if (pins < 0) {
      throw new Error("Negative roll is invalid");
    }
    if (pins > MAXIMUM_NUMBER_OF_PINS) {
      throw new Error("Pin count exceeds pins on the lane");
    }
    let current = this._initialFrame;
    while (current.isComplete() && current?.next() !== undefined) {
      current = current.next()!;
    }

    if (current.isLastFrameWithBothRolls()) {
      if (this.isEndOfGame()) {
        throw new Error("Cannot roll after game is over");
      }
      current.addBonus(pins);
      return;
    }

    current?.addRoll(pins);
  }

  public score(): number {
    if (!this.isEndOfGame()) {
      throw new Error("Score cannot be taken until the end of the game");
    }

    let score = this._initialFrame.score();
    let current = this._initialFrame;
    while (current?.next() !== undefined) {
      current = current.next()!;
      score += current.score();
    }

    return score;
  }

  private isEndOfGame(): boolean {
    const ROLLS_WITHOUT_BONUS = 20;
    const ROLLS_WITH_BONUS = 21;

    let current = this._initialFrame;
    let endOfGame = current.isComplete();

    let total = current.totalRolls();
    let rollsToDiscountFromGame = current.isNormalFrameWithSingleRow() ? 1 : 0;

    while (current.next()) {
      current = current.next()!;
      endOfGame = endOfGame && current.isComplete();

      rollsToDiscountFromGame += current.isNormalFrameWithSingleRow() ? 1 : 0;
      total += current.totalRolls();
    }

    let finishWithBonus =
      current.isLast() &&
      ((current.isStrike() && current.hasRolls()) ||
        (current.isSpare() && current.hasRolls()));

    const outcome = finishWithBonus
      ? total === ROLLS_WITH_BONUS - rollsToDiscountFromGame
      : total === ROLLS_WITHOUT_BONUS - rollsToDiscountFromGame;
    return endOfGame && outcome;
  }
}

class Roll {
  constructor(private readonly _pins: number = -1) {}

  public isSet(): boolean {
    return this._pins !== -1;
  }

  public roll(): number {
    return this._pins === -1 ? 0 : this._pins;
  }
}

type Tabulation = "Strike" | "Spare" | "Open";

class Frame {
  private _tabulation?: Tabulation;
  private _next?: Frame;
  private _previous?: Frame;

  private _roll: Roll;
  private _nextRoll: Roll;
  private _bonus: Roll;

  constructor(private readonly _isLast: boolean) {
    this._roll = new Roll(-1);
    this._nextRoll = new Roll(-1);
    this._bonus = new Roll(-1);
  }

  public hasRolls(): boolean {
    return this._roll.isSet() && this._nextRoll.isSet();
  }

  public total(): number {
    return this._roll.roll() + this._nextRoll.roll();
  }

  public tabulation(): Tabulation | undefined {
    return this._tabulation;
  }

  public isLast(): boolean {
    return this._isLast;
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

  public addRoll(pins: number): void {
    if (!this._roll.isSet()) {
      this._roll = new Roll(pins);
    } else {
      this._nextRoll = new Roll(pins);
    }

    if (this.exceedsNormalFrameCount()) {
        throw new Error("Pin count exceeds pins on the lane");
    }

    this.setTabulation();
  }

  private exceedsNormalFrameCount(): boolean {
    return this.hasRolls() && this.total() > MAXIMUM_NUMBER_OF_PINS && !this.isLast();
  }

  public isLastFrameWithBothRolls(): boolean {
    return this._isLast && this.hasRolls();
  }

  private setTabulation() {
    if (this._roll.roll() === MAXIMUM_NUMBER_OF_PINS) {
      this._tabulation = "Strike";
    }

    if (!this.isStrike()) {
      if (
          this.isComplete() &&
          this._roll.roll() + this._nextRoll.roll() === MAXIMUM_NUMBER_OF_PINS
      ) {
        this._tabulation = "Spare";
      } else {
        this._tabulation = "Open";
      }
    }
  }

  public isStrike(): boolean {
    return this._tabulation === "Strike";
  }

  public isSpare(): boolean {
    return this._tabulation === "Spare";
  }

  public addBonus(pins: number) {
    if (!this.isSpare() && this._nextRoll.roll() !== MAXIMUM_NUMBER_OF_PINS && this._nextRoll.roll() + pins > MAXIMUM_NUMBER_OF_PINS) {
      throw new Error("Pin count exceeds pins on the lane");
    }
    this._bonus = new Roll(pins);
  }

  public score(): number {
    return this.getScoreForRolls();
  }

  private getPreviousConsecutiveStrkes(): number {
    let consecutiveStrikes = 0;
    let current: Frame | undefined = this;
    while (current?.previous()?.isStrike()) {
      consecutiveStrikes++;
      current = current?.previous();
    }
    return consecutiveStrikes;
  }

  private getScoreForRolls(): number {
    const roll = this._roll.roll();
    const nextRoll = this._nextRoll.roll();
    const bonusRoll = this._bonus.roll();

    switch (true) {
      case this._isLast:
        if (this.isSpare()) {
          // Strike after a spare in the last frame
          if (bonusRoll === MAXIMUM_NUMBER_OF_PINS) {
            return roll + nextRoll + bonusRoll;
          }

          return roll * 2 + nextRoll;
        }
        if (this.isStrike() && this._previous?.isStrike()) {
            return roll * 2 + nextRoll + bonusRoll;
        }

        // a strike in the last frame gets a two roll bonues that is counted once
        return roll + nextRoll + bonusRoll;
      case this._previous?.isStrike() && this.isStrike():
        if (this.getPreviousConsecutiveStrkes() < 2) {
          return roll * 2 + nextRoll * 2;
        } else if (this.getPreviousConsecutiveStrkes() === 8) {
          // Perfect game
          return roll + MAXIMUM_NUMBER_OF_PINS * MAXIMUM_NUMBER_OF_PINS;
        }
        return roll + MAXIMUM_NUMBER_OF_PINS;
      case this._previous?.isStrike():
        if (this.getPreviousConsecutiveStrkes() < 2) {
          return roll * 2 + nextRoll * 2;
        }
        return (
          roll * 2 + nextRoll * 2 + roll * this.getPreviousConsecutiveStrkes()
        );
      case this.isStrike():
        return roll;
      case this._previous?.isSpare():
        return roll * 2 + nextRoll;
      default:
        return roll + nextRoll;
    }
  }

  public isComplete(): boolean {
    return (
      this.hasRolls() ||
      this.isStrike() ||
      this.isSpare()
    );
  }

  public totalRolls(): number {
    let total = 0;
    total += this._roll.isSet() ? 1 : 0;
    total += this._nextRoll.isSet() ? 1 : 0;
    total += this._bonus.isSet() ? 1 : 0;

    return total;
  }

  public isNormalFrameWithSingleRow(): boolean {
    return !this._isLast && this._roll.isSet() && !this._nextRoll.isSet();
  }

  private sumOfRolls(): number {
    return this._roll.roll() + this._nextRoll.roll();
  }
}
