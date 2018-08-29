import React from 'react';

const Result = props => {
    const { wordList } = props;
    const arr = Array.from(wordList);
    console.log(arr);

    return (
        <div className="result-box">
            <div className="word-list">
                {arr.forEach((item) => {
                    return (<div>item</div>)
                })}
            </div>
        </div>
    );
};

export default Result;