import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './auth/login.js';
import Home from './dash/home.js';

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

  View = () => {
    if (localStorage.getItem("yakId") === null) {
        return <Login showView={this.showView} setActiveUser={this.setActiveUser} />
    } else {
        switch (this.state.currentView) {
            case "home":
            default:
                return <Home activeUser={this.state.activeUser} />
        }
    }
}

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
