import React, { Component } from 'react';
import './App.css';
import Login from './auth/login.js';
import Home from './dash/home.js';
import Nav from './nav/nav.js'
class App extends Component {
  state = {
    currentView: "login",
    activeUser: sessionStorage.getItem("userId")
  }
  setActiveUser = function (val) {
    sessionStorage.setItem("userId", user.name)
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
    if (sessionStorage.getItem("userId") === null) {
        return <Login setActiveUser={this.setActiveUser} setView={this.setView} />
        /* TODO:

            make a splash page so that there will be something there instead of
            the extra log in field. perhaps some kind of like registration kinda
            deal thing, maybe... or whatever...

        */
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
      <div>
        <Nav
          setView={this.setView}
          activeUser={this.state.activeUser} />
          {this.View()}
      </div>

    );
  }
}

export default App;
