export class List {
  private _values: any[];

  private constructor(values?: any[]) {
    this._values = values || [];
  }

  public static create(...values: any[]): List {
    return new List(values);
  }

  public forEach(cb: (item: any) => void): void {
    for (const item of this._values) {
      cb(item);
    }
  }

  public get values(): any[] {
    return this._values;
  }

  public push(value: any): void {
    this._values = [...this._values, value];
  }

  public append(other: List): List {
    this._values = [...this._values, ...other.values];
    return this;
  }

  public concat(lists: List): List {
    const list = List.create(...this._values);

    lists.forEach((listItem) => {
      if (listItem instanceof List) {
        list.append(listItem);
      } else {
        list.push(listItem);
      }
    });

    return list;
  }

  filter<T>(fn: ((item: T) => boolean)): T[] {
    return this.foldr((acc: T[], curr: T) => fn(curr) ? [curr, ...acc] : acc, [])
  }

  public length(): number {
    return this.foldl((acc: number, _val: any) => {
      acc++;
      return acc;
    }, 0);
  }

  public foldl<T, U>(reducer: (acc: T, val: U) => T, acc: T): T {
    this.forEach((value: U) => acc = reducer(acc, value));
    return acc;
  }

  public foldr<T, U>(reducer: (acc: T, val: U) => T, acc: T): T {
    const list = this.reverse();
    return list.foldl(reducer, acc);
  }

  public map<T>(reducer: (val: T) => T): List {
    const list = List.create();

    this.forEach((value) => list.push(reducer(value)));
    return list;
  }

  public reverse(): List {
    const list = List.create();
    for(let i = this.length() - 1; i >= 0; i--) {
      list.push(this._values[i]);
    }

    return list;
  }
}
