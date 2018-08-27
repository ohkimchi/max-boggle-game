import React from 'react';
import WordList from "./WordList";


const Result = props => {
    const { wordList } = props;

    return (
        <div className="result-box">
            <WordList
                wordList = {wordList}
            />
        </div>
    );
};

export default Result;