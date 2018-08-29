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
        this.setState({
            letter: e.target.value
        });
        const newCell = new CellData(this.state.letter, this.state.rowId, this.state.columnId);
        this.setState({
            cell: newCell,
        });
        console.log("newCell in Cell should change: ", this.state.cell)
        this.helpChangeBoard(this.state.cell)
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