import React, { Component } from 'react';

class Home extends Component {
    state = {
        currentView: "Home",
        activeUser: "afsdlfkja"
    }
    render() {
        return (
            <div className="App">
            <h1 className="App-title">Welcome to React, {this.state.activeUser}</h1>
            </div>
        )
    }
}
export default Home