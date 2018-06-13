import React, { Component } from 'react';
import { Navbar, NavbarItem } from "bloomer"
import { NavbarEnd } from 'bloomer/lib/components/Navbar/NavbarEnd';

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
                <NavbarEnd>Welcome to Honeydew, {this.props.activeUser}</NavbarEnd>
            </Navbar>
        );
    }
}
export default Nav