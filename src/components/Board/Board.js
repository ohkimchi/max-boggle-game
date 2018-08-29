import React, { Component } from 'react';
import Cell from "./Cell";
import './Board.css';
import update from 'immutability-helper';

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: props.board
        }
    }

    onChangeCell(newCell) {
        console.log(newCell.rowId, newCell.columnId)
        let newBoard = update(this.state.board, {
            [newCell.rowId]: {
                [newCell.columnId]: {$set: newCell}
            }
        });
        this.setState({
            board: newBoard
        });
        console.log(this.state.board[0][0])
    }

    changeBoard() {
        this.props.changeBoard(this.state.board);
    }

    render() {
        return (
            <div className="container">
                <div className="board">
                    {this.state.board.map((row, index) => {
                        return (
                            <div className="row" key={index}>
                                {row.map((cell) => {
                                    return (
                                        <Cell cell={cell}
                                              key= {cell.rowId.toString()+cell.columnId.toString()}
                                              updateBoard={this.onChangeCell.bind(this)}
                                        />
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
                <div className="calcBtn">
                    <button onClick={this.changeBoard.bind(this)}>Calculate</button>
                </div>
            </div>
        );
    }

}