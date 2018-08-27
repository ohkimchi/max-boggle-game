import React, { Component } from 'react';
import Board from "../../Board";
import Result from "../../Result";

export default class Game extends Component {
    constructor(props) {
        super(props);
        //to do
        this.initBoard =
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