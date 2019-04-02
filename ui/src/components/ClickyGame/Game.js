import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import axios from 'axios';
import AuthService from '../User/AuthService';
import * as cookieManager from '../../utils/CookieManager';
import Constants from '../../utils/Constants';
import './Game.css';

class Game extends Component {
    static defaultProps = {
        topScoreCount: 5,
    };
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            topScorers: [],
            message: "Click one of the pictures below to start.",
            score: 0,
            currentUserId: props.location.userId || localStorage.getItem(Constants.LocalStorageKey),
            notLoggedIn: false
        };
    }

    componentDidMount() {
        if (!localStorage.getItem(Constants.LocalStorageKey)) {
            this.setState({ notLoggedIn: true });
        }

        axios.get('/api/image', cookieManager.getCookie(Constants.CookieKey))
            .then(response => {
                this.setState({ images: response.data });
            }, error => {
                console.log(error);
            });

        this.fetchTopScorers();
    }

    fetchTopScorers() {
        axios.get(`/api/user/topscorers/${this.props.topScoreCount}`, cookieManager.getCookie(Constants.CookieKey))
            .then(response => {
                if (response.status == 200)
                    this.setState({ topScorers: response.data });
                else
                    alert(Constants.AlertMessage);
                return;
            }, (error) => {
                console.log(error);
            });
    }

    logOutHandler = (e) => {
        AuthService.logout(response => {
            if (response != null)
                this.props.history.push("/");
            else
                alert(Constants.AlertMessage);
            return;
        });
    }

    onClickHandler = (id, clickedState) => {
        const imageOrder = this.state.images;
        if (clickedState) {
            imageOrder.map((image, index) => {
                imageOrder[index].clickedState = false;
            });

            axios.put(`/api/user/${this.state.currentUserId}/topscore/${this.state.score}`, null, cookieManager.getCookie(Constants.CookieKey))
                .then(response => {
                    if (response.status == 200)
                        this.fetchTopScorers();
                    else
                        alert(Constants.AlertMessage);
                    return;
                }, (error) => {
                    console.log(error);
                });

            return this.setState({
                images: imageOrder.sort(() => ((Math.random() * 2 / 3) - 0.5)),
                message: "You Guessed Incorrectly! :( ",
                score: 0
            });

        }
        else {
            imageOrder.map((image, index) => {
                if (id === image.id) {
                    imageOrder[index].clickedState = true;
                }
            });

            const { score } = this.state;
            const newScore = score + 1;
            return this.setState({
                images: imageOrder.sort(() => ((Math.random() * 2 / 3) - 0.5)),
                message: "You Guessed Correctly! Keep going..",
                score: newScore,
            })
        }
    };

    render() {
        const { notLoggedIn } = this.state;
        if (notLoggedIn) {
            localStorage.removeItem(Constants.LocalStorageKey);
            cookieManager.removeCookie(Constants.CookieKey);
            return <Redirect to={{ pathname: '/' }} />
        }

        return (
            <div className="jumbotron jumbotron-fluid">
                <span className="scroller-right"><button className="btn btn-primary" onClick={this.logOutHandler}>Log out</button></span>
                <div className="container text-center">
                    <h2 className="display-5">Clicky Game!</h2>
                    <p className="lead">Click on any image to earn points, but don't click on any more than once.</p>
                </div>

                <div className="container-fluid mainCardContainer">
                    <div className="gameMessage text-center">
                        <p>{this.state.message}</p>
                    </div>
                    <div className="gameScores text-center">
                        <div>Current Score: {this.state.score}</div>
                        <div>Top Scorers: {this.rendertopScorers()}</div>
                    </div>
                    <div className="container">
                        <div className="row">
                            {this.state.images.map(image => (
                                <div key={image.id} className="allCards col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-3" onClick={() => this.onClickHandler(image.id, image.clickedState)}>
                                    <img id={image.id} src={image.imageUrl} alt={image.id} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    rendertopScorers() {
        return (
            <div>
                <ul className="ul list-inline li">
                    {this.state.topScorers.map(user => {
                        return (
                            <li>{user.name} <span>: {user.topScore}</span></li>
                        )
                    })}
                </ul>
            </div>
        )
    }
};

export default withRouter(Game);
