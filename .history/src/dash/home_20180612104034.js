import React, { Component } from 'react';

class Home extends Component {
    state = {
        currentView: "Home",
    }
    render() {
        return (
            <div className="App">
            <h1 className="App-title">Welcome to React, {this.props.activeUser}</h1>
            </div>
        )
    }
}
export default Home