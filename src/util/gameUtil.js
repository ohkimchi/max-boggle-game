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
    this.isWord = false;
    this.value = value;
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
    for (let i = 0, len = dictArr.length; i < len; i ++) {
        var curNode = root;
        let dataWord = dictArr[i];
        for (let j = 0, lent = dataWord.length; j < lent; j ++) {
            let letter = dataWord[j];
            let codeOfLetter = letter.charCodeAt(0);
            let nextNode = curNode.children[codeOfLetter - 97];
            if (nextNode === undefined) {
                nextNode = new TrieNode(curNode, letter);
            }
            curNode = nextNode;
        }
        curNode.isWord = true;
    }
    return root;
};

export const solveBoggle = (board) => {
    const dictionaryTrie = makeDictionaryTrie(dictionaryData);
    var rowN = board.length;
    var colN = board[0].length;
    var queue = [];
    var results = [];

    const recursionInChildrenTrieNode = (parentNode, queue, row, col) => {
        if (parentNode.children !== null) {
            for (let i = 0; i < 26; i ++) {
                if (parentNode.children[i] !== undefined) {
                    let node1 = parentNode.children[i];
                    queue.push([row, col, node1.value, node1, [[row, col]]]);
                    recursionInChildrenTrieNode(node1, queue, row, row, col);
                }
            }
        }
        return queue;
    };

    const moveArdStarAndCheck = (parentNode, s, results, queue, row, col) => {
        if (parentNode.children !== null) {
            for (let i = 0; i < 26; i ++) {
                let node2 = parentNode.children[i];
                if (node2 !== undefined) {
                    if (node2.isWord) {
                        let s2 = s + node2.value;
                        results.push(s2);
                    }
                    queue.push([row, col, node2.value, node2, [[row, col]]]);
                    moveArdStarAndCheck(node2, s, results, queue, row, col);
                }
            }
        }
        return queue;
    };

    //get every cell into the queue
    for (let col = 0; col < colN; col ++) {
        for (let row = 0; row < rowN; row ++) {
            let cell = board[row][col].letter.toLowerCase();
            //char code of * is 42
            let charCodeOfCell = cell.charCodeAt(0);
            //todo
            if (charCodeOfCell === 42) {
                let trieN = dictionaryTrie;
                recursionInChildrenTrieNode(trieN, queue, row, col);
            } else {
                let node1 = dictionaryTrie.children[charCodeOfCell - 97];
                if (node1 !== undefined) {
                    queue.push([row, col, cell, node1, [[row, col]]]);
                }
            }
        }
    }

    //loop through the queue
    while (queue.length !== 0) {
        let [row, col, s, node1, history] = queue.pop();
        queue.pop();
        console.log(queue[0]);
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
        for (let [dx, dy] of directions) {
            let [x2, y2] = [row + dx, col + dy];
            for (let his of history) {
                if (his[0] === x2 && his[1] === y2) {
                    continue;
                }
            }
            if (x2 >= 0 && x2 < rowN && y2 >= 0 && y2 < colN) {
                let newHist = history; //new history
                newHist.push([x2, y2]);
                let newLetter = board[x2][y2].letter.toLowerCase();

                let charCodeOfNewCell = newLetter.charCodeAt(0);
                //todo
                if (charCodeOfNewCell === 42) {
                    let TrieN = dictionaryTrie;
                    moveArdStarAndCheck(TrieN, s, results, queue, x2, y2);
                } else {
                    let node2 = node1.children[charCodeOfNewCell - 97];
                    if (node2 !== undefined && node2.isWord) {
                        let s2 = s + newLetter;
                        results.push(s2);
                        queue.push([x2, y2, s2, node2, newHist]);
                    }
                }
            }
        }
    }
    console.log("results: ", results);
    return results;
};