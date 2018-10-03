import React, { Component } from 'react';
import { Navbar, NavbarItem } from "bloomer"
import Login from '../../auth/login'
import './nav.css'

class Nav extends Component {
    state = {
        currentView: "Home",
    }
    onClickNav = function (e) {
        this.setState({
            isActive: (!this.state.isActive)
        })
        this.props.showView(e)
    }.bind(this)


    render () {
        if (this.props.activeUser !== null) {
            return (
                <Navbar style={{
                                border: 'solid 1px 00D1B2',
                                margin: '0'
                                    }}>
                            <NavbarItem id="nav__home" onClick={this.props.showView} href='/'>Home</NavbarItem>
                            <NavbarItem id="nav__tool" onClick={this.props.showView} href='/'>Add Tool</NavbarItem>
                            <NavbarItem id="nav__task" onClick={this.props.showView} href='/'>Add Project</NavbarItem>
                            <NavbarItem id="nav__logout" onClick={this.props.showView} href='/'>Log Out</NavbarItem>
                            <NavbarItem>Welcome to Honeydew, {this.props.userName}</NavbarItem>
                </Navbar>
            );
        } else {
            return(
                <Navbar style={{ border: 'solid 1px 00D1B2', margin: '0' }}>
                    <NavbarItem>Welcome to Honeydew!</NavbarItem>
                    <NavbarItem>Please Login:</NavbarItem>
                    <NavbarItem>
                        <Login
                                setActiveUser={this.props.setActiveUser}
                                showView={this.props.showView}
                                setUserName={this.props.setUserName} />
                    </NavbarItem>
                </Navbar>
            )
        }
    }
}
export default Nav
