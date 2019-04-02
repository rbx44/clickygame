import React, { Component } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import AuthService from './AuthService';
import * as cookieManager from '../../utils/CookieManager';
import Constants from '../../utils/Constants';
import '../../App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            userId: '',
        };
    }

    componentDidMount() {
        if (localStorage.getItem(Constants.LocalStorageKey)) {
            this.setState({ userId: localStorage.getItem(Constants.LocalStorageKey) });
        }
    }

    onChangeHandler = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        const { email, password } = this.state;

        AuthService.login(email, password, (response) => {
            if (response != null && response.status == 200) {
                localStorage.setItem(Constants.LocalStorageKey, response.data.userId);
                this.setState({ userId: response.data.userId });
            }
            else if (response.status == 401)
                alert(Constants.WrongPasswordMessage);
            else
                alert(Constants.AlertMessage);
            return;
        });
    }

    render() {
        const { userId } = this.state;
        if (userId) {
            return <Redirect to={{ pathname: '/game', userId: userId }} />
        }
        return (
            <div className="text-center" style={{ padding: "50px 0" }}>
                <div className="logo"> Login </div>
                <div className="login-form-1">
                    <form className="text-left" onSubmit={this.onSubmitHandler}>
                        <div className="login-form-main-message"></div>
                        <div className="main-login-form">
                            <div className="login-group">
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
                            <button type="submit" className="btn btn-primary submitbtn">Submit</button>
                            <div className="etc-login-form">
                                <p>new user? <Link to='/create'><span>register here</span ></Link ></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);