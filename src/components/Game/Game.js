import React, { Component } from 'react';
import {
    shuffleBoard,
    solveBoggle
} from "../../util/gameUtil";
import Board from "../Board/Board.js";
import Result from "../Result/Result.js";
import update from "immutability-helper";
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

    onChangeCell(newCell) {
        let newBoard = update(this.state.board, {
            [newCell.rowId]: {
                [newCell.columnId]: {$set: newCell}
            }
        });
        const newResult = solveBoggle(newBoard);
        this.setState({
            board: newBoard,
            wordListInResult: newResult
        });
    }

    render() {
        console.log(this.state.wordListInResult)

        return (
            <div className="game-and-result">
                <div className="game-zone">
                    <Board board = {this.state.board}
                           cellChange = {this.onChangeCell.bind(this)}
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