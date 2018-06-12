import React, { Component } from 'react';
import App from '../App.js'
class Home extends Component {
    state = {
        currentView: "Home"
    }
    render() {
        return (
            <div className="App">
            <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>

            </header>
            </div>
        )
    }
}
export default Home