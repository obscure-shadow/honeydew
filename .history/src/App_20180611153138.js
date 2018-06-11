import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './auth/login.js';

class App extends Component {
  state = {
    currentView: "login",
    activeUser: localStorage.getItem("userId")
  }
  setActiveUser = function (val) {
    this.setState({
      activeUser: val
    })
  }.bind(this)

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <Login setActiveUser={this.setActiveUser} />
        </header>
      </div>
    );
  }
}

export default App;
