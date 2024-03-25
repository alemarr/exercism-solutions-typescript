export class Series {
  constructor(private _numbers: string) {
    this.init();
  }

  private init() {
    if (this._numbers.length === 0) {
      throw new Error('series cannot be empty')
    }
  }

  slices(size: number) {
    const sliceSize = new SliceSize(size, this._numbers);

    return [...this._numbers].map((_strNumber, i) => {
      const slice = this._numbers.substring(i, i + sliceSize.size)
      return slice.split('').map(str => parseInt(str));
    })
    .filter(slice => slice.length === size);
  }
}

class SliceSize {
  constructor(private _size: number, private _numbers: string) {
    this.init();
  }

  get size(): number {
    return this._size;
  }

  private init(): void {
    if (this._size > this._numbers.length) {
      throw new Error('slice length cannot be greater than series length');
    }
    if (this._size === 0) {
      throw new Error('slice length cannot be zero');
    }
    if (this._size < 0) {
      throw new Error('slice length cannot be negative');
    }
  }
}
