import React, { Component } from 'react';
import { Navbar } from "bloomer"

class Nav extends Component {
    state = {
        currentView: "Home",
    }
    render () {
        return (
            <Navbar style={{ border: 'solid 1px #00D1B2', margin: '0' }}>
            nav bar woooo!
            </Navbar>
        );
    }
}
export default Nav