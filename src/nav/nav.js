import React, { Component } from 'react';
import { Navbar, NavbarItem , NavbarBurger } from "bloomer"
import { NavbarEnd } from 'bloomer/lib/components/Navbar/NavbarEnd';
import Login from '../auth/login'

class Nav extends Component {
    state = {
        isActive: false,
        currentView: "Home",
    }
    onClickNav = function (e) {
        this.setState({
            isActive: (!this.state.isActive)
        })
        this.props.showView(e)
    }.bind(this)


    render () {
        if (this.props.activeUser !== null){
            return (
                <Navbar style={{ border: 'solid 1px #00D1B2', margin: '0' }}>
                    <NavbarBurger isActive={this.state.isActive} onClick={this.onClickNav} />
                    <NavbarItem id="nav__home" onClick={this.props.showView}>Home</NavbarItem>
                    <NavbarItem id="nav__tool" onClick={this.props.showView}>Add Tool</NavbarItem>
                    <NavbarItem>Add Project</NavbarItem>
                    <NavbarEnd>
                        <NavbarItem>Welcome to Honeydew, {this.props.userName}</NavbarItem>
                    </NavbarEnd>
                </Navbar>
            );
        } else {
            return(
                <Navbar style={{ border: 'solid 1px #00D1B2', margin: '0' }}>
                    <NavbarItem>Welcom to Honeydew!</NavbarItem>
                    <NavbarEnd>
                        <NavbarItem>Please Login:</NavbarItem>
                        <NavbarItem>
                            <Login
                                setActiveUser={this.props.setActiveUser}
                                showView={this.props.showView}
                                setUserName={this.props.setUserName} />
                        </NavbarItem>
                    </NavbarEnd>
                </Navbar>
            )
        }
    }
}
export default Nav