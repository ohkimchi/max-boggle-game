import CellData from "../data/CellData";
import testBoardData from './testboard';
import dictionaryData from './dictionary';
const rowN = 4;
const colN = 4;

export const shuffleBoard = () => {
    return board(testBoardData);
};

const board = testBoardData => {
    const board = [
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', '']
    ];
    const boardData = [];
    testBoardData.map((data, index) => {
        return boardData[index] = data.letter.toLowerCase();
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

var TrieNode = function (parent, value) {
    this.parent = parent;
    this.children = new Array(26);
    this.value = value;
    this.word = '';
    if (parent !== undefined) {
        parent.children[value.charCodeAt(0) - 97] = this;
    }
};

const makeDictionaryTrie = dictionaryData => {
    const dictionaryDataArray = dictionaryData => {
        var dictionaryDataArr = [];
        dictionaryData.map((data, index) => {
            return dictionaryDataArr.push(data.word);
        });
        return dictionaryDataArr;
    };

    const dictArr = dictionaryDataArray(dictionaryData);
    var root = new TrieNode(undefined, '');
    for (const vocab of dictArr) {
        let node = root;
        insert(vocab, node);
    }
    return root;
};

const insert = (vocab, root) => {
    let node = root;
    for (let letter of [...vocab]) {
        let index = letter.charCodeAt(0) - 97;
        if (node.children[index] === undefined) {
            node.children[index] = new TrieNode(node, letter);
        }
        node = node.children[index];
    }
    node.word = vocab;
};

const search = (word, root) => {
    let node = root;
    for (let letter of [...word]) {
        let index = letter.charCodeAt(0) - 97;
        if (node.children[index] === undefined) {
            return false;
        } else {
            node = node.children[index];
        }
    }
    return node.word === word;
};

const startsWith = (prefix, root) => {
    let node = root;
    for (let letter of [...prefix]) {
        let index = letter.charCodeAt(0) - 97;
        if (node.children[index] === undefined) {
            return false;
        } else {
            node = node.children[index];
        }
    }
    return true;
};

const dfs = (row, col, board, visited, str, root, results) => {
    var directions = [
        [1, 0],
        [1, -1],
        [1, 1],
        [0, -1],
        [0, 1],
        [-1, 0],
        [-1, 1],
        [-1, -1]
    ];
    let node = root;
    if (row >= 0 && row < rowN && col >= 0 && col < colN && !visited[row][col]) {
        let letter = board[row][col].letter.toLowerCase();
        let newStr;
        if (letter.charCodeAt(0) === 42) {
            for (let i = 0; i < 26; i++) {
                letter = String.fromCharCode(97 + i);

                newStr = str + letter;
                if (startsWith(newStr, node)) {
                    if (search(newStr, node)) {

                        results.add(newStr);
                    }
                    visited[row][col] = true;
                    for (let [dx, dy] of directions) {
                        dfs(row + dx, col + dy, board, visited, newStr, node, results);
                    }
                    visited[row][col] = false;
                }

            }
        } else {
            newStr = str + letter;
            if (startsWith(newStr, node)) {
                if (search(newStr, node)) {
                    results.add(newStr);
                }
                visited[row][col] = true;
                for (let [dx, dy] of directions) {
                    dfs(row + dx, col + dy, board, visited, newStr, node, results);
                }
                visited[row][col] = false;
            }
        }
    }
};

export const solveBoggle = (board) => {
    const dictionaryTrie = makeDictionaryTrie(dictionaryData);
    let visited = [
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false]
    ];
    let results = new Set();

    //get every cell into the queue
    for (let col = 0; col < colN; col ++) {
        for (let row = 0; row < rowN; row ++) {
            //todo
            dfs(row, col, board, visited, "", dictionaryTrie, results);
        }
    }
    return results;
};