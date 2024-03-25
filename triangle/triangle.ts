type TriangleKind = "equilateral" | "isosceles" | "scalene";

export class Triangle {
  constructor(private a: number, private b: number, private c: number) {}

  get isEquilateral(): boolean {
    return this.kind("equilateral");
  }

  get isIsosceles(): boolean {
    return this.kind("isosceles") || this.isEquilateral;
  }

  get isScalene(): boolean {
    return this.kind('scalene')
  }

  kind(triangleKind: TriangleKind): boolean {
    const equalityValidations = !this.validateInequalityViolation() && !this.validateSidesAreNotZero();
    return equalityValidations && this.getMatchingSides() === triangleKind; 
  }

  private allSidesAreEqual(): boolean {
    return this.a == this.b && this.b == this.c;
  }

  private allSidesAreDifferent(): boolean {
    return this.a != this.b && this.a != this.c && this.b != this.c;
  }

  private getMatchingSides(): TriangleKind {
    if (this.allSidesAreEqual()) return "equilateral";
    if (this.allSidesAreDifferent()) return "scalene";
    return "isosceles";
  }

  private validateInequalityViolation(): boolean {
    return this.a + this.b < this.c ||
      this.b + this.c < this.a ||
      this.c + this.a < this.b;
  }

  private validateSidesAreNotZero(): boolean {
    return this.a == 0 || this.b == 0 || this.c == 0;
  }
}
