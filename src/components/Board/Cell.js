import React, { Component } from 'react';
import "./Cell.css";
import CellData from "../../data/CellData";

class Cell extends Component {

    //handle input change
    updateCell(e) {
        const {cell, changeBoardFromCell} = this.props;
        const newCell = new CellData(e.target.value, cell.rowId, cell.columnId);
        changeBoardFromCell(newCell);
    }

    render() {
        const {forClassName, cell } = this.props;
        if (forClassName !== undefined) {
            return(
                <div className = 'cell shouldColor' >
                    <div className = 'letter' >
                        <p>{cell.letter}</p>
                    </div>
                </div>
            );
        } else {
            return(
                <div className = 'cell'>
                    <div className = 'letter' >
                        <input type="text"
                               className="cell-input"
                               value={cell.letter}
                               onChange={(e) => this.updateCell(e)}
                        />
                    </div>
                </div>
            );
        }

    }
}

export default Cell;