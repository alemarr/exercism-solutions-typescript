const TOTAL_HOURS_PER_DAY = 24 * 60;

export class Clock {
  private _hours: number;
  private _minutes: number;

  private _calculatedHour: number;
  private _calculatedMinute: number;

  constructor(hours: number, minutes?: number) {
    this._hours = hours;
    this._minutes = minutes ?? 0;

    this._calculatedHour = 0;
    this._calculatedMinute = 0;

    this.calculate(this._hours, this._minutes);
  }

  private calculate(hours: number, minutes?: number): void {
    const totalMinutesInput = (minutes ?? 0) + (hours * 60);

    let minutesForCalculation = totalMinutesInput + TOTAL_HOURS_PER_DAY;
    
    while (minutesForCalculation < 0) {
      minutesForCalculation = TOTAL_HOURS_PER_DAY - Math.abs(minutesForCalculation);
    }

    const numberOfHours = Math.abs(minutesForCalculation / 60);
    const calculatedHours = Math.trunc(numberOfHours % 24);
    const restOfMinutes = minutesForCalculation % 60;
    
    this._calculatedHour = calculatedHours;
    this._calculatedMinute = restOfMinutes;
  }

  public toString(): string {
    return `${this._calculatedHour.toString().padStart(2, '0')}:${this._calculatedMinute.toString().padStart(2, '0')}`
  }

  public plus(minutes: number): Clock {
    this.calculate(this._hours, this._minutes + minutes);
    return this;
  }

  public minus(minutes: number): Clock {
    this.calculate(this._hours, this._minutes - minutes);
    return this;
  }

  public equals(other: Clock): boolean {
    return this.toString() === other.toString();
  }
}
