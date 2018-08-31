import React, { Component } from 'react';
import Board from "../Board/Board";
import "./Route.css";

export default class Routes extends Component {

    render() {
        const {targetRoutes, board} = this.props;
        if (targetRoutes !== [] && targetRoutes !== null) {
            return(
                <div className="allRoutes">
                    {targetRoutes.map((route, i) => {
                        return(
                            <div className="indiRoute"
                                 key={"route-" + i}>
                                <div className="route-title">
                                    <p>Route {i+1}</p>
                                </div>
                                <div className="route-details">
                                    <Board key={"board-" + i}
                                           board={board}
                                           targetR={route}
                                           forKey={i}/>
                                </div>
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