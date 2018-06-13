import React, { Component } from 'react';
import { Navbar, NavbarItem } from "bloomer"

class Nav extends Component {
    state = {
        currentView: "Home",
    }
    render () {
        return (
            <Navbar style={{ border: 'solid 1px #00D1B2', margin: '0' }}>
                <NavbarItem>nav</NavbarItem>
                <NavbarItem>bar</NavbarItem>
                <NavbarItem>woooo!</NavbarItem>
            </Navbar>
        );
    }
}
export default Nav