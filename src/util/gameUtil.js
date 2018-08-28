import CellData from "../data/CellData";
import testBoardData from './testboard';


const rowN = 4;
const colN = 4;

export const shuffleBoard = () => {
    const board = [
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', '']
    ];

    const boardData = [];
    testBoardData.map((data, index) => {
        boardData[index] = data.letter;
    });

    for (let row = 0; row < rowN; row ++) {
        for (let col = 0; col < colN; col ++) {
            const testBoardItem = boardData[row+col];
            const cellData = new CellData(testBoardItem, row, col);
            board[row][col] = cellData;
        }
    }
    return board;
};