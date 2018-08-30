import React, { Component } from 'react';
import Board from "../Board/Board";

export default class Routes extends Component {

    render() {
        if (this.props.targetRoutes !== [] && this.props.targetRoutes !== null) {
            return(
                <div className="allRoutes">
                    {this.props.targetRoutes.map((route, i) => {
                        return(
                            <Board key={i} board={this.props.board}
                                   targetR={route}/>
                        );
                    })}
                </div>

            );
        } else {
            return null;
        }
    }
}