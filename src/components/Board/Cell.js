import React from 'react';

const Cell = props => {
    const { letter } = props;

    return (
        <button className= 'cell'>
            {letter}
        </button>
    );
};

export default Cell;