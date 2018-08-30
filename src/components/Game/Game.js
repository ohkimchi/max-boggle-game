import React, { Component } from 'react';
import {
    shuffleBoard,
    solveBoggle,
    filter,
    searchRouteForWord,
} from "../../util/gameUtil";
import Board from "../Board/Board";
import Result from "../Result/Result";
import Filter from "../Result/Filter";
import update from "immutability-helper";
import "./Game.css"
import Routes from "../Result/Routes";

export default class Game extends Component {
    constructor() {
        super();
        this.initializeBoard = shuffleBoard();
        this.showResult = solveBoggle(this.initializeBoard)[0];
        this.getRoutes = solveBoggle(this.initializeBoard)[1];
        this.state = {
            board: this.initializeBoard,
            wordListInResult: this.showResult,
            inputVal: "",
            routes: this.getRoutes,
            selectedRoutes: []
        };
    }

    //when user changes the cell, board and result will be updated
    onChangeCell(newCell) {
        let newBoard = update(this.state.board, {
            [newCell.rowId]: {
                [newCell.columnId]: {$set: newCell}
            }
        });
        const newResult = solveBoggle(newBoard)[0];
        const filteredResult = filter(newResult, this.state.inputVal);
        this.setState({
            board: newBoard,
            wordListInResult: filteredResult
        });
    }

    //when user inputs in the search filter
    onChangeFilter(newInput) {
        const result = solveBoggle(this.state.board)[0];
        const newResult = filter(result, newInput);
        this.setState({
            wordListInResult: newResult,
            inputVal: newInput
        });
    }

    displayRoutes(word) {
        let routes = searchRouteForWord(word, this.state.routes);
        if (routes !== undefined) {
            this.setState({
                selectedRoutes: routes
            });
        }
    }

    render() {
        return (
            <div className="big-container">
                <div className="game-zone">
                    <Board board={this.state.board}
                           cellChange={(newCell) => this.onChangeCell(newCell)}
                    />
                </div>

                <div className="result-zone">
                    <Result
                        wordList = {this.state.wordListInResult}
                        routes = {this.state.routes}
                    />
                </div>

                <div className="search-zone">
                    <Filter
                        inputValue = {this.state.inputVal}
                        filteredList = {this.state.wordListInResult}
                        inputChange = {(newInput) => this.onChangeFilter(newInput)}
                        displayR={(word) => this.displayRoutes(word)}
                    />
                </div>

                <div className="routes-zone">
                    <Routes
                        targetRoutes={this.state.selectedRoutes}
                        board={this.state.board}
                    />
                </div>
            </div>
        );
    }
}