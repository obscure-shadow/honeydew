import React, { Component } from 'react';

class Home extends Component {
    state = {
        currentView: "Home",
    }
    render() {
        return (
            <body>
                <Column isSize='1/3'>
                </Column>
                <Column isSize='1/3'>
                </Column>
                <Column isSize='1/3'>
                </Column>
            </body>
        )
    }
}
export default Home