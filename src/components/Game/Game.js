import React, { Component } from 'react';
import Board from "../../Board";
import Result from "../../Result";
import {shuffleBoard} from "../../util/gameUtil";

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.initBoard = shuffleBoard();
        this.state = {
            board: this.initBoard,
            wordListInResult: {}
        };
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
                    <Result
                        wordList = {this.state.wordListInResult}
                    />
                </div>
            </div>
        );
    }
}