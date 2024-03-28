type ResultType = "equal" | "unequal" | "sublist" | "superlist";

export class List {
  private readonly _items: number[];

  constructor(...items: number[]) {
    this._items = items;
  }

  public items(): number[] {
    return this._items;
  }

  private isSublist(other: List): boolean {
    return (
      this.items().length === 0 ||
      `,${other.items().join(",")},`.includes(`,${this._items.join(",")},`)
    );
  }

  private isSuperlist(other: List): boolean {
    return (
      other.items().length === 0 ||
      `,${this._items.join(",")},`.includes(`,${other.items().join(",")},`)
    );
  }

  compare(other: List): ResultType {
    if (this.isSublist(other) && this.isSuperlist(other)) return "equal";
    if (this.isSuperlist(other)) return "superlist";
    if (this.isSublist(other)) return "sublist";
    return "unequal";
  }
}
