import CellData from "../data/CellData";
import testBoardData from './testboard';
import dictionaryData from './dictionary';
const rowN = 4;
const colN = 4;

//init board with data from json
export const shuffleBoard = () => {
    return board(testBoardData);
};

//get board with Cell type populated
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

//define the Trie structure
var TrieNode = function (parent, value) {
    this.parent = parent;
    this.children = new Array(26);
    this.value = value;
    this.word = '';
    if (parent !== undefined) {
        parent.children[value.charCodeAt(0) - 97] = this;
    }
};

//get dictionary in Trie struction dictionary.json
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

//insert each word into the Trie
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

//search if a word exists in a Trie
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

/**
 * check in the Trie if a prefix exists
 * difference from search is the return:
 * search func sets the last node with word
 */
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

//get cells which were visited
const getVisitedCells = (board, visited, curRow, curCol) => {
    let hist = [];
    let rowN = visited.length;
    let colN = visited[0].length;
    for (let row = 0; row < rowN; row ++) {
        for (let col = 0; col < colN; col ++) {
            if (visited[row][col]) {
                hist.push([board[row][col].letter, row, col]);
            }
        }
    }
    hist.push([board[curRow][curCol].letter, curRow, curCol]);
    return hist;
};

//git all the routes of any word existing in dictionary
const whenWordInDict = (newStr, results, board, visited, row, col, history) => {
    results.add(newStr);
    let visitedCells = getVisitedCells(board, visited, row, col);
    let route = {};
    route[newStr] = visitedCells;
    history.push(route);
};

//combine routes of each word into an array & return summarized routes
const combineRoutes = (history, results) => {
    let routeList = [];
    for (let word of results) {
        let routeObj = {};
        const routesForEachWord = history.filter(hist => Object.keys(hist)[0] === word).map(arr => Object.values(arr));
        routeObj[word] = routesForEachWord;
        routeList.push(routeObj);
    }
    return routeList;
};

//get all the routes of specific word
export const searchRouteForWord = (word, routeList) => {
    let arr = routeList.filter(r => Object.keys(r)[0] === word)[0];
    if (arr !== undefined) {
        let routes = Object.values(arr)[0];
        return routes;
    } else {
        return null;
    }
};

//dfs to get the results and the history (later becomes routes info)
const dfs = (row, col, board, visited, str, root, results, history) => {
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
        let letter = board[row][col].letter;
        let newStr;
        if (letter.charCodeAt(0) === 42) {
            for (let i = 0; i < 26; i++) {
                letter = String.fromCharCode(97 + i);

                newStr = str + letter;
                if (startsWith(newStr, node)) {
                    if (search(newStr, node)) {
                        whenWordInDict(newStr, results, board, visited, row, col, history);
                    }
                    visited[row][col] = true;
                    for (let [dx, dy] of directions) {
                        dfs(row + dx, col + dy, board, visited, newStr, node, results, history);
                    }
                    visited[row][col] = false;
                }

            }
        } else {
            newStr = str + letter;
            if (startsWith(newStr, node)) {
                if (search(newStr, node)) {
                    whenWordInDict(newStr, results, board, visited, row, col, history);
                }
                visited[row][col] = true;
                for (let [dx, dy] of directions) {
                    dfs(row + dx, col + dy, board, visited, newStr, node, results, history);
                }
                visited[row][col] = false;
            }
        }
    }
};

//get words list and routes info
export const solveBoggle = (board) => {
    const dictionaryTrie = makeDictionaryTrie(dictionaryData);
    let visited = [
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false]
    ];
    let results = new Set();
    let history = [];

    //get every cell into the queue
    for (let col = 0; col < colN; col ++) {
        for (let row = 0; row < rowN; row ++) {
            //todo
            dfs(row, col, board, visited, "", dictionaryTrie, results, history);
        }
    }
    let finalHis = combineRoutes(history, results);
    return [results, finalHis];
};

//filter the results depending on what user inputs
export const filter = (results, filterWord) => {
    const filteredResult = new Set([...results].filter(res => res.includes(filterWord)));
    return filteredResult;
};