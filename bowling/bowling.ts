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
            throw new Error('Negative roll is invalid');
        }
        if (pins > 10) {
            throw new Error('Pin count exceeds pins on the lane');
        }
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

    constructor(private readonly _isLast: boolean) {
    }

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
        const tmp = [...this._rolls];
        tmp.push(roll);
        const total = tmp.reduce((acc, roll) => {
            acc += roll;
            return acc;
        })
        if (total > 10 && !this._isLast) {
            throw new Error('Pin count exceeds pins on the lane');
        }
        this._rolls.push(roll);
    }

    public addStrike(roll: number): void {
        this._tabulation = "Strike";
        this.addRoll(roll);
    }

    public addOpen(roll: number): void {
        this.addRoll(roll);
        if (this.tabulation() !== "Strike") {
            if (this.isComplete() && this._rolls[0] + this._rolls[1] === 10) {
                this._tabulation = "Spare";
            } else {
                this._tabulation = "Open";
            }
        }
    }

    public score(): number {
        return this.getScoreForRolls();
    }

    private getPreviousConsecutiveStrkes(): number {
        let consecutiveStrikes = 0;
        let current: Frame | undefined = this;
        while (current?.previous()?.tabulation() === "Strike") {
            consecutiveStrikes++;
            current = current?.previous();
        }
        return consecutiveStrikes;
    }

    private getScoreForRolls(): number {
        const roll = this._rolls[0] ?? 0;
        const nextRoll = this._rolls[1] ?? 0;
        const bonusRoll = this._rolls[2] ?? 0;

        switch (true) {
            case this._isLast:
                if (this.tabulation() === "Spare") {
                    return roll * 2 + nextRoll;
                }
                if (this.tabulation() === "Strike") {
                    if (this._previous?.tabulation() === "Strike") {
                        return roll * 2 + nextRoll + bonusRoll;
                    }
                }

                return roll + nextRoll + bonusRoll;
            case this._previous?.tabulation() === "Strike" && this.tabulation() === "Strike":
                if (this.getPreviousConsecutiveStrkes() < 2) {
                    return roll * 2 + nextRoll * 2;
                } else if (this.getPreviousConsecutiveStrkes() === 8) {
                    // Perfect game
                    return roll + 10 * 10
                }
                return roll + 10;
            case this._previous?.tabulation() === "Strike":
                if (this.getPreviousConsecutiveStrkes() < 2) {
                    return roll * 2 + nextRoll * 2;
                }
                return roll * 2 + nextRoll * 2 + roll * this.getPreviousConsecutiveStrkes()
            case this.tabulation() === "Strike":
                return roll;
            case this._previous?.tabulation() === "Spare":
                return roll * 2 + nextRoll;
            default:
                return roll + nextRoll;
        }
    }

    public isComplete(): boolean {
        return this._rolls.length >= 2 || this._tabulation === "Strike";
    }
}
