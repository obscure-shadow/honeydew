import React, { Component } from 'react';
import App from '../App.js'
class Home extends Component {
    state = {
        currentView: "Home"
    }
    render() {
        return (
            <App />
        )
    }
}
export default Home