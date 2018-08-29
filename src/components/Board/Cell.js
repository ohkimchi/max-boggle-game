import React, { Component } from 'react';
import "./Cell.css";
import CellData from "../../data/CellData";

class Cell extends Component {

    updateCell(e) {
        const {cell} = this.props;
        const newCell = new CellData(e.target.value, cell.rowId, cell.columnId);
        this.props.changeBoardFromCell(newCell);
    }

    render() {
        return(
            <div className = 'cell'>
                <div className = 'letter' >
                    <input type="text"
                           value={this.props.cell.letter}
                           onChange={(e) => this.updateCell(e)}
                    />
                </div>
            </div>
        );
    }
};

export default Cell;