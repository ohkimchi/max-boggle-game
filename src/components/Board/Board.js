import React, { Component } from 'react';
import Cell from "./Cell";
import './Board.css';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

//for alert in Cell when user inputs
const options = {
    position: 'bottom center',
    timeout: 5000,
    offset: '30px',
    transition: 'scale'
};

export default class Board extends Component {

    renderBoard = () => {
        const { board, targetR, forKey } = this.props;
        const checkExist = this.checkExist;
        const renderCell = this.renderCell;
        const rowsView = [];
        board.map((row, index) => {
            const rowView = [];
            let exist = false;
            row.map((cell, jndex) => {
                exist = checkExist(targetR, index, jndex);
                rowView.push(renderCell(exist, cell));
                return rowView;
            });

            rowsView.push(
                <div className="row" key={"row-" + forKey + index}>
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

    checkExist = (arr, index, jndex) => {
        let exist = false;
        arr[0].map((item) => {
            return (item[1] === index && item[2] === jndex) ? exist = true : null;
        });
        return exist;
    };

    renderCell = (exist, cell) => {
        const { forKey } = this.props;
        const forClass = "shouldColor";
        return (
            <div>
                { exist ? (
                    <Cell cell={cell}
                          forClassName={forClass}
                          key= {"cell-"+ forKey + cell.rowId.toString() + cell.columnId.toString()}
                    /> ) : (
                    <Cell cell={cell}
                          key= {"cell-"+ forKey + cell.rowId.toString() + cell.columnId.toString()}
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
                <AlertProvider template={AlertTemplate} {...options}>
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
                </AlertProvider>
            );

        }

    }
}