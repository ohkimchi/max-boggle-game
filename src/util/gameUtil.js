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
    if (parent !== undefined) {
        parent.children[value.charCodeAt(0) - 97] = this;
    }
};

const makeDictionaryTrie = dictionaryData => {
    var root = new TrieNode(undefined, '');
    var curNode = root;
    dictionaryData.map((data, index) => {

        //makeTrie for dictionary:
        var dataWord = data.word;
        for (var i = 0, len = dataWord.length; i < len; i ++) {
            var letter = dataWord[i];
            var codeOfLetter = letter.charCodeAt(0);
            var nextNode = curNode.children[codeOfLetter - 97];
            if (nextNode === undefined) {
                nextNode = new TrieNode(curNode, letter);
            }
            curNode = nextNode;
        }
        curNode.isWord = true;
        return curNode;
    });
    return root;
};

export const solveBoggle = (board) => {
    const dictionaryTrie = makeDictionaryTrie(dictionaryData);

    var rowN = board.length;
    var colN = board[0].length;
    var queue = [];
    var results = new Set();

    for (let col = 0; col < colN; col ++) {
        for (let row = 0; row < rowN; row ++) {
            var cell = board[row][col].letter.toLowerCase();
            //char code of * is 42
            var charCodeOfCell = cell.charCodeAt(0);
            //todo
            if (charCodeOfCell === 42) {
                let childrenLength = dictionaryTrie.children.length;
                console.log(childrenLength);
                if (childrenLength > 0) {
                    for (let childIndex = 0; childIndex < childrenLength; childIndex ++) {
                        let node1 = dictionaryTrie.children[childIndex];
                        if (node1 !== undefined) {
                            queue.push([row, col, cell, node1, [[row, col]]]);
                        }
                        console.log(queue, "87");
                    }
                }
            } else {
                let node1 = dictionaryTrie.children[charCodeOfCell - 97];
                if (node1 !== undefined) {
                    queue.push([row, col, cell, node1, [[row, col]]]);
                }
            }
        }
        console.log(queue);
    }
    console.log(queue);

    while (queue.length !== 0) {
        var [row, col, s, node1, h] = queue.pop();
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
            var [x2, y2] = [row + dx, col + dy];
            if (h[0][0] === x2 && h[0][1] === y2) {
                continue;
            };
            if (x2 >= 0 && x2 < rowN && y2 >= 0 && y2 < colN) {
                var newHist = h.slice(); //new history
                newHist.push([x2, y2]);
                var s2 = s + board[row][col];


                var charCodeOfNewCell = board[row][col].letter.charCodeAt(0);
                //todo
                if (charCodeOfNewCell === 42) {
                    let childrenLength = 26;
                    for (let childIndex = 0; childIndex < childrenLength; childIndex ++) {
                        let node2 = node1.children[childIndex];
                        if (node2 !== undefined) {
                            if (node2.isWord) {
                                results.add(s2);
                            }
                            queue.push([x2, y2, s2, node2, newHist]);
                        }
                    }

                } else {
                    let node2 = node1.children[charCodeOfNewCell - 97];
                    if (node2 !== undefined) {
                        if (node2.isWord) {
                            results.add(s2);
                        }
                        queue.push([x2, y2, s2, node2, newHist]);
                    }
                }
            }
        }
    }
    return results;
};