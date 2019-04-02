import React, { Component } from 'react';
import Login from './components/User/Login';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <div class="container">
        <Login />
      </div>
    );
  }
}

export default App;