import React, { Component } from 'react';

class Home extends Component {
    state = {
        currentView: "Home",
        activeUser: ""
    }
    render() {
        return (
            <div className="App">
            <h1 className="App-title">Welcome to React</h1>
            <p>{this.state.activeUser}</p>
            </header>
            </div>
        )
    }
}
export default Home