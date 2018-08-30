import React, { Component } from 'react';
import './Filter.css';

export default class Filter extends Component {

    onChangeInput(e) {
        const userInput = e.target.value;
        this.props.inputChange(userInput);
    }

    render() {
        return (
            <div>
                <label htmlFor="inp" className="inp">
                    <input type="text"
                           className="search-input"
                           name="fullInput"
                           value={this.props.inputValue}
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
