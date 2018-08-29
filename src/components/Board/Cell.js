import React, { Component } from 'react';
import "./Cell.css";
import CellData from "../../data/CellData";

class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cell: props.cell,
            letter: props.cell.letter,
            rowId: props.cell.rowId,
            columnId: props.cell.columnId
        }
    }

    helpChangeBoard() {
        this.props.updateBoard(this.state.cell);
    }

    updateCell(e) {
        const newCell = new CellData(e.target.value, this.state.rowId, this.state.columnId);
        this.helpChangeBoard(newCell);
        this.setState({
            cell: newCell,
            letter: e.target.value
        });
    }

    render() {
        return(
            <div className = 'cell'>
                <div className = 'letter' >
                    <input type="text"
                           value={this.state.letter}
                           onChange={(e) => this.updateCell(e)}
                    />
                </div>
            </div>
        );
    }
};

export default Cell;