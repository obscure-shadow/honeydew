import React, { Component } from 'react';
import { Field, FieldBody, Control, Input, Button } from 'bloomer';


class Login extends Component {
    // initialize state username as an empty string
    state = {
        username: "",
    }
    // event handler that handles the username submission
    handleSubmit = function (evt) {
        evt.preventDefault()
        //fetch the username defined in the state above from the json server
        fetch(`http://localhost:8088/users?name=${this.state.username}`)
            //parse user object
            .then(r => r.json())

            .then(user => {
                //check to see if user exists, if not send error message.
                if (user === undefined) {
                    alert(this.state.errorMessage)
                    /*
                        To Do : some kinda maybe register or something or the other like that
                        or like, whatever man.
                    */
                }
                // add user to session storage, because like, ya know, why not?
                sessionStorage.setItem("userId", user.name)
                // set active user state on app.js to user name
                this.props.setActiveUser(user.name)
                this.props.setView("home")
            })
    }.bind(this);


    handleFormFieldChange = function (evt) {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }.bind(this);


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <Field isHorizontal>
                    <FieldBody>

                        <Input type="text"
                            id='username'
                            value={this.state.username}
                            onChange={this.handleFormFieldChange}
                            placeholder='username'></Input>

                    </FieldBody>

                    <Button type="submit" id="login__button" isColor="info">Submit</Button>
                </Field>
                </form>
            </div>
        )
    }
}
export default Login