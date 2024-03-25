const GIGASECONDS_SECONDS = Math.pow(10, 9);

export class Gigasecond {
  constructor(private readonly initialDate: Date) {}

  public date(): Date {
    const moment = new Date(this.initialDate);
    moment.setSeconds(moment.getSeconds() + GIGASECONDS_SECONDS);
    return moment;
  }
}