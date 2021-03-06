import React from 'react';
import './Result.css';
import {searchRouteForWord} from "../../util/gameUtil";

const Result = props => {
    const {wordList, routes} = props;

    //display the list of words with tag showing the number of possible routes
    const resultList = Array.from(wordList).sort().map(item => {
        let numb = searchRouteForWord(item, routes).length;
        return (
            <li key={ item } className="Item">{ item }<span>&nbsp;</span>
                <span className="num">{ numb }</span>
            </li>
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