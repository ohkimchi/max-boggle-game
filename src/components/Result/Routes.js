import React, { Component } from 'react';
import Board from "../Board/Board";

export default class Routes extends Component {

    render() {
        const { targetRoutes } = this.props;
        if (targetRoutes !== [] && targetRoutes !== null) {
            return(
                <div className="allRoutes">
                    {targetRoutes.map((route, i) => {
                        return(
                            <div key={"route-" + i}>
                                <p>Route {i+1}</p>
                                <Board key={"board-" + i}
                                       board={this.props.board}
                                       targetR={route}
                                       forKey={i}
                                />
                            </div>
                        );
                    })}
                </div>

            );
        } else {
            return null;
        }
    }
}