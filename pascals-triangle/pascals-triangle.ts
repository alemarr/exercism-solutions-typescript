export class Triangle {
  private _rows: Array<number[]>;
  private _lastRow: number[];

  constructor(private _rowsCount: number) {
    this._rows = [];
    this._lastRow = [];
    this.init();
  }

  get lastRow(): number[] {
    return this._lastRow;
  }

  get rows(): Array<number[]> {
    return this._rows;
  }

  init() {
    const positionNumber = 1;
    for (let i = 0; i < this._rowsCount; i++) {
      let newRow = [];
      for (let j = 0; j < i + 1; j++) {
        const previousRow = this._rows[i - 1] ?? [];
        const leftValue = previousRow[j - 1] ?? 0;
        const rightValue = previousRow[j] ?? 0;

        const sum = leftValue + rightValue;

        newRow[j] = sum != 0 ? sum : positionNumber;
      }
      this._rows.push(newRow);
    }

    this._lastRow = this._rows[this._rowsCount - 1];
  }
}
