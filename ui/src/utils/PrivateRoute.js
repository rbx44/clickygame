import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from '../components/User/AuthService';
import Constants from './Constants';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (<Route {...rest} render={props => {
        return (localStorage.getItem(Constants.LocalStorageKey)
            ? <Component {...props} {...rest} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />)
    }} />);
}

export default PrivateRoute;