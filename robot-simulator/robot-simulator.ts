export class InvalidInputError extends Error {
  constructor(message?: string) {
    super();
    this.message = message || "Invalid Input";
  }
}

type Direction = "north" | "east" | "south" | "west";
type Coordinates = [number, number];
type Rotation = "left" | "right";

const INITIAL_ROTATION = 1;
const MAX_ROTATION = 4;

const rotation: Record<Rotation, number> = { left: -1, right: 1 };
const directionMap: Record<Direction, number> = {
  north: INITIAL_ROTATION,
  east: 2, 
  south: 3,
  west: MAX_ROTATION,
};

const isDirection = (s: string): s is Direction => {
  return ["north", "south", "east", "west"].includes(s);
}

const getDirectionFromCalculation = (calculation: number): Direction => {
  const [direction] = Object.entries(directionMap).filter(
    ([_, value]) => calculation === value
  );
  return direction[0] as Direction;
}

export class Robot {
  private _bearing: Direction = "north";
  private _coordinates: Coordinates = [0, 0];

  get bearing(): Direction {
    return this._bearing;
  }

  get coordinates(): Coordinates {
    return this._coordinates;
  }

  place(placement: { x: number; y: number; direction: string }) {
    if (!isDirection(placement.direction)) {
      throw new InvalidInputError("Invalid direction.");
    }
    this._bearing = placement.direction;
    this._coordinates = [placement.x, placement.y];
  }

  evaluate(instructions: string): void {
    for (const instruction of instructions) {
      switch (instruction) {
        case "A":
          this.advance();
          break;
        case "L":
          this.changeDirection(rotation.left);
          break;
        case "R":
          this.changeDirection(rotation.right);
          break;
        default:
          throw new InvalidInputError();
      }
    }
  }

  private advance(): void {
    if (this.isOnYAxis()) {
      this.advanceOnYAxis();
    } else {
      this.advanceOnXAxis();
    }
  }

  private isOnYAxis(): boolean {
    return this._bearing === "south" || this._bearing === "north";
  }

  private advanceOnYAxis()
  {
    this.changePosition(0, 1);
  }

  private advanceOnXAxis()
  {
    this.changePosition(1, 0);
  }

  private changeDirection(movement: number): void {
    let direction = directionMap[this.bearing] + movement;
    if (direction > MAX_ROTATION) {
      direction -= MAX_ROTATION;
    }
    if (direction < INITIAL_ROTATION) {
      direction = MAX_ROTATION;
    }

    this._bearing = getDirectionFromCalculation(direction);
  }

  private changePosition(x: number, y: number): void {
    if (this._bearing === "south") {
      y *= -1;
    }
    if (this._bearing === "west") {
      x *= -1;
    }

    this._coordinates[0] += x;
    this._coordinates[1] += y;
  }
}
