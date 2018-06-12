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

    // View switcher -> passed to NavBar and Login
    // Argument can be an event (via NavBar) or a string (via Login)
    showView = function (view) {

      // Update state to correct view will be rendered
      this.setState({
          currentView: view
      })

  }.bind(this)

  View = () => {
    if (localStorage.getItem("userId") === null) {
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
      <article>
        {this.View()}
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>

        </header>
      </div>
      </article>
    );
  }
}

export default App;
