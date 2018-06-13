import React, { Component } from 'react';
import { Navbar, NavbarItem } from "bloomer"
import { NavbarEnd } from 'bloomer/lib/components/Navbar/NavbarEnd';
import Login from '../auth/login'

class Nav extends Component {
    state = {
        currentView: "Home",
    }
    render () {
        if (this.props.activeUser !== null){
            return (
                <Navbar style={{ border: 'solid 1px #00D1B2', margin: '0' }}>
                    <NavbarItem>Home</NavbarItem>
                    <NavbarItem>Add Tool</NavbarItem>
                    <NavbarItem>Add Project</NavbarItem>
                    <NavbarEnd>
                        <NavbarItem>Welcome to Honeydew, {this.props.activeUser}</NavbarItem>
                    </NavbarEnd>
                </Navbar>
            );
        } else {
            return(
                <Navbar style={{ border: 'solid 1px #00D1B2', margin: '0' }}>
                    <NavbarItem>Welcom to Honeydew!</NavbarItem>
                    <NavbarEnd>
                        <NavbarItem>Please Login:</NavbarItem>
                        <NavbarItem><Login setActiveUser={this.props.setActiveUser} showView={this.props.showView} /></NavbarItem>
                    </NavbarEnd>
                </Navbar>
            )
        }
    }
}
export default Nav