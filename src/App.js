import React, { Component } from 'react';
import './App.css';
import Game from './components/Game/Game';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="header">
                    <h1>What are the words in this board?</h1>
                </div>
                <Game />
            </div>
        );
    }
}

export default App;
