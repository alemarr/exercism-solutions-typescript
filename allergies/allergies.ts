const allergens = {
  eggs: 0b0,
  peanuts: 0b1,
  shellfish: 0b10,
  strawberries: 0b11,
  tomatoes: 0b100,
  chocolate: 0b101,
  pollen: 0b110,
  cats: 0b111,
};

type AllergyType = keyof typeof allergens;

export class Allergies {
  constructor(private _score: number) {}

  list(): string[] {
    return Object.keys(allergens).filter((_, i) => this._score & (1 << i));
  }

  allergicTo(allergy: AllergyType) {
    return this._score >> allergens[allergy] & 1;
  }
}
