import React from 'react';
import './Result.css';

const Result = props => {
    const { wordList } = props;

    const resultList = Array.from(wordList).sort().map(item => {
        return (
            <li key={ item } className="Item">{ item }</li>
        )
    });

    return (
        <div className="result-box">
            <h1 className="number">{wordList.size}</h1>
            <p>words have been found from this boggle and existing in dictionary: </p>
            <div className="word-list">
                <nav>
                    <ol id = "result-list">{resultList}</ol>
                </nav>
            </div>
        </div>
    );
};

export default Result;