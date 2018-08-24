import React, { Component } from 'react';
import * as fs from 'fs';

class Board extends Component {
    var initialBoard = fs.readFileSync('TestBoard.txt', 'utf8');
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className="Board">

            </div>
        );
    }
}

export default Board;