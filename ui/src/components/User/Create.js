import React, { Component } from 'react';
import axios from 'axios';
import { withRouter, Link, Redirect } from 'react-router-dom';
import Constants from '../../utils/Constants';
import * as cookieManager from '../../utils/CookieManager';
import '../../App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Create extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            loggedIn: false,
        };
    }

    componentDidMount() {
        if (localStorage.getItem(Constants.LocalStorageKey)) {
            localStorage.removeItem(Constants.LocalStorageKey);
            this.setState({ loggedIn: true });
        }
        if (cookieManager.getCookie(Constants.CookieKey)) {
            cookieManager.removeCookie(Constants.CookieKey);
            this.setState({ loggedIn: true });
        }
    }

    onChangeHandler = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        const { name, email, password } = this.state;

        axios.post('/create', { name, email, password })
            .then(response => {
                if (response.status == 201)
                    this.props.history.push("/");
                else
                    alert(Constants.AlertMessage);
            }, error => {
                console.log(error);
            });
    }

    render() {
        const { loggedIn } = this.state;
        if (loggedIn) {
            return <Redirect to={{ pathname: '/' }} />
        }

        return (
            <div className="text-center" style={{ padding: "50px 0" }}>
                <div className="logo"> Register </div>
                <div className="login-form-1">
                    <form className="text-left" onSubmit={this.onSubmitHandler}>
                        <div className="login-form-main-message"></div>
                        <div className="main-login-form">
                            <div className="login-group">
                                <div className="form-group">
                                    <label for="name" className="sr-only">className</label>
                                    <input type="text" className="form-control" id="name" name="name" placeholder="name"
                                        required value={this.state.name} onChange={this.onChangeHandler} />
                                </div>
                                <div className="form-group">
                                    <label for="email" className="sr-only">Email</label>
                                    <input type="email" className="form-control" id="email" name="email" placeholder="email"
                                        required value={this.state.email} onChange={this.onChangeHandler} />
                                </div>
                                <div className="form-group">
                                    <label for="password" className="sr-only">Password</label>
                                    <input type="password" className="form-control" id="password" name="password" placeholder="password"
                                        required value={this.state.password} onChange={this.onChangeHandler} />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary submitbtn">Create</button>
                            <div className="etc-login-form">
                                <p>already have an account? <Link to='/'><span>login here</span ></Link ></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


export default withRouter(Create);