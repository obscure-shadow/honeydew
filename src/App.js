import React, { Component } from "react";
import "./App.css";
import Login from "./auth/login.js";
import Home from "./dash/home.js";
import Nav from "./nav/nav.js";
import Tool from "./add/addtool.js"
import Task from "./add/addtask.js"
import Project from "./projects/project.js"
import Edit from "./projects/edit.js"
class App extends Component {
  state = {
    currentView: "login",
    activeUser: sessionStorage.getItem("userId"),
    userName: sessionStorage.getItem("userName"),
    viewProps: {}
  };
    setActiveUser = function(val) {

    this.setState({
      activeUser: val
    });
  }.bind(this);

  setUserName = function(val) {

    this.setState({
      userName: val
    });
  }.bind(this);

  // View switcher -> passed to NavBar and Login
  // Argument can be an event (via NavBar) or a string (via Login)
  showView = (e, ...obj) => {
    let view = null

    // Click event triggered switching view
    if (e.hasOwnProperty("target")) {
        view = e.target.id.split("__")[1]

        // View switch manually triggered by passing in string
    } else {
        view = e
    }

    // If user clicked logout in nav, empty local storage and update activeUser state
    if (view === "logout") {
        this.setActiveUser(null)
    }

    // Update state to correct view will be rendered
    this.setState({
        currentView: view,
        viewProps: Object.assign({}, ...obj)
    })
  }

  View = () => {
    if (sessionStorage.getItem("userId") === null) {
      return (
        <Login setActiveUser={this.setActiveUser} showView={this.showView} />
      );
      /* TODO:

            make a splash page so that there will be something there instead of
            the extra log in field. perhaps some kind of like registration kinda
            deal thing, maybe... or whatever...

        */
    } else {
      switch (this.state.currentView) {
        case "home":
        default:
          return <Home activeUser={this.state.activeUser} showView={this.showView} />;
        case "tool":
          return <Tool activeUser={this.state.activeUser} showView={this.showView}/>
        case "task":
          return <Task activeUser={this.state.activeUser} showView={this.showView}/>
        case "project":
          return <Project {...this.state.viewProps} activeUser={this.state.activeUser} showView={this.showView}/>
        case "logout":
          return <Login setActiveUser={this.setActiveUser} showView={this.showView} />
        case "edit":
          return <Edit {...this.state.viewProps} setActiveUser={this.setActiveUser} showView={this.showView} />
      }
    }
  };

  render() {
    return (
      <div>
        <Nav showView={this.showView}
          activeUser={this.state.activeUser}
          setActiveUser={this.setActiveUser}
          setUserName={this.setUserName}
          userName={this.state.userName}/>
        {this.View()}
      </div>
    );
  }
}

export default App;
