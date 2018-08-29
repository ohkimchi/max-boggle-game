import React from 'react';
import "./Cell.css";

const Cell = props => {
    const { letter } = props;

    return (
        <div className = 'cell'>
            <div className = 'letter' >
                {letter}
            </div>
        </div>
    );
};

export default Cell;