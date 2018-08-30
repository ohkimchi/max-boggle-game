import React, { Component } from 'react';
import './Filter.css';

export default class Filter extends Component {

    onChangeInput(e) {
        const filteredList = this.props.filteredList;
        const userInput = e.target.value;
        const filteredResult = new Set([...filteredList].filter(res => res.includes(userInput)));

        this.props.inputChange(filteredResult, userInput);
    }

    render() {
        return (
            <div>
                <p>Search word containing: </p>
                <input type="text"
                       className="search-input"
                       value={this.props.inputValue}
                       onChange={(e) => this.onChangeInput(e)}/>
            </div>
        )
    }
};
