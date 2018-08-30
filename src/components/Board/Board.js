    import React, { Component } from 'react';
    import Cell from "./Cell";
    import './Board.css';

    export default class Board extends Component {

        renderBoard = () => {
            const { board, targetR } = this.props;
            const renderRow = this.renderRow;
            const rowsView = [];
            board.map((row, index) => {
                const rowView = [];
                row.map((cell, jndex) => {
                    rowView.push(renderRow(targetR, index, jndex, cell))
                    return rowView;
                });
                rowsView.push(
                    <div className="row" key={"row-" + index}>
                        {rowView}
                    </div>
                );
                return rowsView;
            });
            return (
                <div>
                    {rowsView}
                </div>
            )
        };

        renderRow = (arr, index, jndex, cell) => {
            const renderCell = this.renderCell;
            const cells = [];
            arr.map((item) => {
                return (item[1] === index && item[2] === jndex) ? cells.push(renderCell(true, cell)) : cells.push((renderCell(false, cell)))
            });
            return cells;
        };

        renderCell = (exist, cell) => {
            return (
                <div>
                    { exist ? (
                        <Cell cell={cell}
                              className="shouldColor"
                              key= {"cell-"+cell.rowId.toString()+cell.columnId.toString()}
                        /> ) : (
                        <Cell cell={cell}
                              key= {"cell-"+cell.rowId.toString()+cell.columnId.toString()}
                        />
                    )}
                </div>
            )
        };

        render() {
            const { targetR, board, cellChange } = this.props;
            if (targetR !== undefined) {
                const boardView = this.renderBoard();
                return (
                    <div className="container">
                        <div className="board">
                            {boardView}
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="container">
                        <div className="board">
                            {board.map((row, index) => {
                                return (
                                    <div className="row" key={index}>
                                        {row.map((cell) => {
                                            return (
                                                <Cell cell={cell}
                                                      key= {"cell-"+cell.rowId.toString()+cell.columnId.toString()}
                                                      changeBoardFromCell={cellChange}
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
    }