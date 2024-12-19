export class CustomSet<T> {
  constructor(private _items: T[] = []) {}

  items(): T[] {
    return this._items;
  }

  empty(): boolean {
    return this._items.length === 0;
  }

  contains(element: T): boolean {
    return this._items.includes(element);
  }

  add(element: T): CustomSet<T> {
    return new CustomSet<T>([...this._items, element]);
  }

  subset(other: CustomSet<T>): boolean {
    return this._items.every((item) => other.contains(item));
  }

  disjoint(other: CustomSet<T>): boolean {
    return !this._items.some((item) => other.contains(item));
  }

  eql(other: CustomSet<T>): boolean {
    return this.subset(other) && other.subset(this);
  }

  union(other: CustomSet<T>): CustomSet<T> {
    return new CustomSet<T>([...this._items, ...other.difference(this).items()]);
  }

  intersection(other: CustomSet<T>): CustomSet<T> {
    return new CustomSet<T>(this._items.filter(item => other.contains(item)));
  }

  difference(other: CustomSet<T>): CustomSet<T> {
    return new CustomSet<T>(this._items.filter(item => !other.contains(item)));
  }
}
