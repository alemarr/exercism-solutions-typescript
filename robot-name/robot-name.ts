export class Robot {
  public robotName: string;

  constructor() {
    this.robotName = RobotNameGenerator.generate();
  }

  public get name(): string {
    return this.robotName;
  }

  public resetName(): void {
    this.robotName = RobotNameGenerator.generate();
  }

  public static releaseNames(): void {
    RobotNameGenerator.release();
  }
}

enum NameConstants {
  CHAR_START = 97,
  CHAR_END = 122,
  INT_START = 0,
  INT_END = 9
}

class RobotNameGenerator {
  private static NAMES: string[] = [];

  public static generate()
  {
    let name = '';
    do {
      name += this.randomizeMany(2, this.randomChar);
      name += this.randomizeMany(3, this.randomInt);
    } while (this.NAMES.includes(name));

    this.NAMES.push(name);

    return name;
  }

  public static release()
  {
    this.NAMES = [];
  }

  private static randomizeMany(times: number, callback: Function): string
  {
    let part = '';
    for (let i = 0; i < times; i++) {
      part += callback();
    }
    return part;
  }

  private static randomInt(): number
  {
    return Math.round(Math.random() * (NameConstants.INT_END - NameConstants.INT_START) + NameConstants.INT_START);
  }

  private static randomChar(): string
  {
    return String.fromCharCode(
        Math.round(
            Math.random() * (NameConstants.CHAR_END - NameConstants.CHAR_START) + NameConstants.CHAR_START
        )
    ).toUpperCase();
  }
}
