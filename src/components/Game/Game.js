import React, { Component } from 'react';
import {
    shuffleBoard,
    solveBoggle
} from "../../util/gameUtil";
import Board from "../Board/Board.js";
import Result from "../Result/Result.js";
import "./Game.css"

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.initializeBoard = shuffleBoard();
        this.showResult = solveBoggle(this.initializeBoard);
        this.state = {
            board: this.initializeBoard,
            wordListInResult: this.showResult
        };
    }

    render() {
        return (
            <div className="game-and-result">
                <div className="game-zone">
                    <Board
                        board = {this.state.board}
                    />
                </div>

                <div className="result-zone">
                    <Result
                        wordList = {this.state.wordListInResult}
                    />
                </div>
            </div>
        );
    }
}