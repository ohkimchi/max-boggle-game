import React from 'react';
import Cell from "./Cell";

const Board = props => {
    const { board } = props;
    return (
        <div className="board">
            {board.map((row, index) => {
                return (
                    <div className="row" key={index}>
                        {row.map(cell => {
                            return (
                                <Cell
                                    letter={cell.letter}
                                    key={cell.columnId}
                                />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default Board;