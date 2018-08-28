import React, { Component } from 'react';
import {
    shuffleBoard,
    solveBoggle
} from "../../util/gameUtil";
import Board from "../Board/Board.js";
import Result from "../Result/Result.js";

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.initializeBoard = shuffleBoard();
        this.showResult = solveBoggle(this.initializeBoard);
        this.state = {
            board: this.initializeBoard,
            wordListInResult: this.showResult
        };
        console.log("wordListInResult:" + this.state.wordListInResult)
    }

    render() {
        return (
            <div>
                <div className="game-zone">
                    <Board
                        board = {this.state.board}
                    />
                </div>

                <div className="result-zone">
                    <h6>The words in the dictionary are: </h6>
                    <Result
                        wordList = {this.state.wordListInResult}
                    />
                </div>
            </div>
        );
    }
}