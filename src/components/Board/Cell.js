import React, { Component } from 'react';
import "./Cell.css";
import CellData from "../../data/CellData";
import { withAlert } from 'react-alert';

class Cell extends Component {

    //handle input change
    updateCell(e) {
        const {cell, changeBoardFromCell} = this.props;
        const userInput = e.target.value.toLowerCase();
        let uInput = userInput;
        //alert when user keys in unconditional stuff
        if (userInput.length > 0) {
            if (userInput.length > 1) {
                this.props.alert.show("One letter, please.");
                uInput = userInput.charAt(0);
            }

            let charCodeOfInput = userInput.charCodeAt(0);
            if (charCodeOfInput !== 42
                && !(charCodeOfInput >= 65 && charCodeOfInput <= 90)
                && !(charCodeOfInput >= 97 && charCodeOfInput <= 122)
                && !(isNaN(charCodeOfInput))) {
                this.props.alert.show("Letter, please.");
                uInput = cell.letter;
            }
        }

        const newCell = new CellData(uInput, cell.rowId, cell.columnId);
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

export default withAlert(Cell);