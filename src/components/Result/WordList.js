import React from 'react';

const WordList = props => {
    const { wordList } = props;
    const wordKeys = Object.keys(wordList);
    const itemList = wordKeys.map(function (wordKey, index) {
        return <li key={index}>{wordKey}</li>;
    });

    return (
        <div>
            <div className="word-list">
                <div className="words">
                    {itemList}
                </div>
            </div>
        </div>
    );
};

export default WordList;