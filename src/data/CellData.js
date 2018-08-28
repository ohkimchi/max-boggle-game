export default class CellData {
    constructor(letter, rowId, columnId) {
        this.letter = letter;
        this.rowId = rowId;
        this.columnId = columnId;
    }

    clone() {
        return new CellData(this.letter, this.rowId, this.columnId);
    }
}