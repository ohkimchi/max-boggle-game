import React from 'react';

const Result = props => {
    const { wordList } = props;

    const resultList = Array.from(wordList).map(item => {
        return (
            <p key={ item } className={ item }>{ item }</p>
        )
    });

    return (
        <div className="result-box">
            <div className="word-list">
                {resultList}
            </div>
        </div>
    );
};

export default Result;