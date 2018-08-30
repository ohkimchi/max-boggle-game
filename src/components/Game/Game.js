import React, { Component } from 'react';
import {
    shuffleBoard,
    solveBoggle,
    filter
} from "../../util/gameUtil";
import Board from "../Board/Board";
import Result from "../Result/Result";
import Filter from "../Result/Filter";
import update from "immutability-helper";
import "./Game.css"

export default class Game extends Component {
    constructor() {
        super();
        this.initializeBoard = shuffleBoard();
        this.showResult = solveBoggle(this.initializeBoard);
        this.state = {
            board: this.initializeBoard,
            wordListInResult: this.showResult,
            inputVal: ""
        };
    }

    //when user changes the cell, board and result will be updated
    onChangeCell(newCell) {
        let newBoard = update(this.state.board, {
            [newCell.rowId]: {
                [newCell.columnId]: {$set: newCell}
            }
        });
        const newResult = solveBoggle(newBoard);
        const filteredResult = filter(newResult, this.state.inputVal);
        this.setState({
            board: newBoard,
            wordListInResult: filteredResult
        });
    }

    //when user inputs in the search filter
    onChangeFilter(newResult, newInput) {
        this.setState({
            wordListInResult: newResult,
            inputVal: newInput
        });
    }

    render() {
        return (
            <div className="big-container">
                <div className="game-zone">
                    <Board board = {this.state.board}
                           cellChange = {(newCell) => this.onChangeCell(newCell)}
                    />
                </div>

                <div className="result-zone">
                    <Result
                        wordList = {this.state.wordListInResult}
                    />
                </div>

                <div className="search-zone">
                    <Filter
                        inputValue = {this.state.inputVal}
                        filteredList = {this.state.wordListInResult}
                        inputChange = {(newResult, newInput) => this.onChangeFilter(newResult, newInput)}
                    />
                </div>
            </div>
        );
    }
}