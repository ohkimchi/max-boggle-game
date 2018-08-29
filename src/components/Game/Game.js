import React, { Component } from 'react';
import {
    shuffleBoard,
    solveBoggle
} from "../../util/gameUtil";
import Board from "../Board/Board.js";
import Result from "../Result/Result.js";
import "./Game.css"

export default class Game extends Component {
    constructor() {
        super();
        this.initializeBoard = shuffleBoard();

        this.showResult = solveBoggle(this.initializeBoard);
        this.state = {
            board: this.initializeBoard,
            wordListInResult: this.showResult
        };
    }

    onChangeBoard(newBoard) {
        this.setState({
            board: newBoard
        });
        console.log(this.state.board[0][0])

    }

    onChangeResult(newResult) {
        this.setState({
            wordListInResult: this.newResult
        })
    }

    render() {
        return (
            <div className="game-and-result">
                <div className="game-zone">
                    <Board board = {this.state.board}
                           changeBoard = {this.onChangeBoard.bind(this)}/>
                </div>

                <div className="result-zone">
                    <Result
                        wordList = {this.state.wordListInResult}
                        changeResult = {this.onChangeResult.bind(this)}
                    />
                </div>
            </div>
        );
    }
}