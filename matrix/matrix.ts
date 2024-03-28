export class Matrix {
  private _rows: Array<number[]>;
  private _columns: Array<number[]>;

  constructor(private _input: string) {
    this._rows = this.getRows();
    this._columns = this.getColumns();
  }

  get rows(): Array<number[]> {
    return this._rows;
  }

  get columns(): Array<number[]> {
    return this._columns;
  }

  getRows(): Array<number[]> {
    const rows: Array<number[]> = [];
    this._input.split("\n").map((row) => {
      let newRow = row.split(" ").map((value) => {
        return parseInt(value);
      });
      rows.push(newRow);
    });

    return rows;
  }

  getColumns(): Array<number[]> {
    const columns: Array<number[]> = [];

    const width = this.rows.length;
    const height = this.rows[0].length;

    for (let i = 0; i < height; i++) {
      let newRow = [];
      for (let j = 0; j < width; j++) {
        newRow.push(this.rows[j][i]);
      }

      columns.push(newRow);
    }

    return columns;
  }
}
