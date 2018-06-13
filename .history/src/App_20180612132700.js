import React, { Component } from 'react';
import logo from './logo.svg';
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
      <div>
        <Nav setView={this.setView}
          setSearchType={this.setSearchType}
          setSearchValue={this.setSearchValue}
          searchDisplay={this.state.searchDisplay}
          deleteActiveUser={this.deleteActiveUser}
          activeUser={this.state.activeUser}
          setActiveUser={this.setActiveUser} />
          {this.View()}
      </div>

    );
  }
}

export default App;
