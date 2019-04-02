import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import Create from './components/User/Create';
import Game from './components/ClickyGame/Game';
import NotFound from './utils/NotFound';
import App from './App';

ReactDOM.render(
    <Router>
        <div>
            <Switch>
                <Route exact path='/' component={App} />
                <Route path='/create' component={Create} />
                <PrivateRoute path='/game' component={Game} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>,
    document.getElementById('root')
);