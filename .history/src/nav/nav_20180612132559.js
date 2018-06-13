import React, { Component } from "react";
// Using bloomer tags to import bulma styling
import { Navbar, NavbarItem, Input, NavbarBurger, NavbarBrand, NavbarMenu, NavbarLink, NavbarDropdown } from "bloomer";
import 'bulma/css/bulma.min.css'
import './nav.css'
import Login from '../auth/login'

class Nav extends Component {

    // Storing session storage as an object in state named currentUser
    state = {
        isActive: false,
        firstName: "",
        image: "",
        searchValue: "",
        searchType: "All"
    }

    // Making a fetch request against sessionStorage to find relevant user and storing first name in state
    componentDidMount() {
        const currentUser = sessionStorage.getItem('userId')
        if (currentUser !== null) {
            fetch(`http://127.0.0.1:8088/users/${currentUser}`)
                .then(r => r.json())
                .then(response => {
                    this.setState({
                        firstName: response.name.first,
                        image: response.image
                    })
                })
        }
    }

    // event handler for clicking nav drop down burger
    // sets isActive property in state to the opposite of what it currently is
    onClickNav = function (e) {
        this.setState({
            isActive: (!this.state.isActive)
        })
        document.querySelector("#input__search").value = ""
        this.props.setView(e)
    }.bind(this)

    //on click of search button
    onClickSearch = function (e) {
        //fire function to close navbar
        this.onClickNav(e)

        /*
            add code here
            to fire search functionality
        */
    }.bind(this)

    handleSearchKeyPress = function (event) {
        this.setState({
            searchValue: event.target.value,
        })
    }.bind(this)

    handleSearchTypeChange = function (event) {
        this.setState({
            searchType: event.target.textContent
        })
    }.bind(this)

    render() {
        if (this.props.activeUser !== null){
            // debugger
            return (
                <Nav>
                    <NavbarBrand>
                        <NavbarItem>Yak</NavbarItem>
                        <NavbarBurger isActive={this.state.isActive} onClick={this.onClickNav} />
                    </NavbarBrand>
                    <NavbarMenu isActive={this.state.isActive}>
                        <NavbarItem id="nav__home" onClick={this.onClickNav}>Home</NavbarItem>
                        <NavbarItem hasDropdown isHoverable>
                            <NavbarLink>Search For: {this.props.searchDisplay}</NavbarLink>
                            <NavbarDropdown>
                                <NavbarItem className="nav__pointer" id="all" onClick={this.props.setSearchType}>All</NavbarItem>
                                <NavbarItem className="nav__pointer" id="people" onClick={this.props.setSearchType}>People</NavbarItem>
                                <NavbarItem className="nav__pointer" id="posts" onClick={this.props.setSearchType}>Posts</NavbarItem>
                                <NavbarItem className="nav__pointer" id="events" onClick={this.props.setSearchType}>Events</NavbarItem>
                            </NavbarDropdown>
                        </NavbarItem>
                        <Input id="input__search" type="text" placeholder="Search" onChange={this.props.setSearchValue}></Input>
                        <NavbarItem id="nav__search" className="nav__pointer" onClick={this.onClickSearch}>Search</NavbarItem>
                        <NavbarItem id="nav__notifications" className="nav__pointer" onClick={this.onClickNav}>Notifications</NavbarItem>
                        <NavbarItem id="nav__profile" className="nav__pointer" onClick={this.onClickNav}>Profile</NavbarItem>
                        <NavbarItem id="nav__logout" className="nav__pointer" onClick={this.onClickNav}>Logout</NavbarItem>
                    </NavbarMenu>
                </Nav>
            )
        } else {
            return(
                <Nav>
                    <NavbarBrand>
                        <NavbarItem>Yak</NavbarItem>
                        {/* <NavbarBurger isActive={this.state.isActive} onClick={this.onClickNav} /> */}
                        <NavbarItem>
                            <Login setActiveUser={this.props.setActiveUser} setView={this.props.setView}/>
                        </NavbarItem>
                    </NavbarBrand>
                </Nav>
            )
        }

    }
}

export default Nav