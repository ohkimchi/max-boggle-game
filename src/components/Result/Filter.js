import React, { Component } from 'react';
import './Filter.css';

export default class Filter extends Component {

    //handle onChange event when user keys in the search field
    onChangeInput(e) {
        const {inputChange, displayR} = this.props;
        const userInput = e.target.value.toLowerCase();
        inputChange(userInput);
        displayR(userInput);

    }

    render() {
        const {inputValue} = this.props;
        return (
            <div>
                <label htmlFor="inp" className="inp">
                    <input type="text"
                           className="search-input"
                           name="fullInput"
                           value={inputValue}
                           onChange={(e) => this.onChangeInput(e)}
                           id="inp"
                           placeholder="&nbsp;"
                    />
                    <span className="label">Type here to search word containing:</span>
                    <span className="border"></span>
                </label>
            </div>
        )
    }
};
