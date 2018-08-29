import React, { Component } from 'react';
import Cell from "./Cell";
import './Board.css';

export default class Board extends Component {
    render() {
        console.log("board in Board: ", this.props)
        return (
            <div className="container">
                <div className="board">
                    {this.props.board.map((row, index) => {
                        return (
                            <div className="row" key={index}>
                                {row.map((cell) => {
                                    return (
                                        <Cell cell={cell}
                                              key= {"cell-"+cell.rowId.toString()+cell.columnId.toString()}
                                              changeBoardFromCell={this.props.cellChange}
                                        />
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

}