import React from 'react';
import { Link } from 'react-router-dom';
import '../components/ClickyGame/Game.css';


const NotFound = ({ component: Component, ...rest }) => {
    return (
        <div className="jumbotron jumbotron-fluid">
            <div className="container text-center">
                <h2 className="display-5">Oops! :(</h2>
                <p className="lead">You're truly lost.</p>
            </div>

            <div className="container-fluid mainCardContainer">
                <div className="gameMessage text-center">
                    <p><Link to='/'><span>login here</span ></Link ></p>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
