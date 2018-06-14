import React, { Component } from 'react';
import { Field, FieldBody, Input, Button } from 'bloomer';

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

            .then(users => {
                const user = users[0]
                //check to see if user exists, if not send error message.
                if (user === undefined) {
                    alert(this.state.errorMessage)
                    /*
                        TODO:
                            -some kinda maybe register or...something or the other like that,
                            or like, whatever man.
                            -maybe like, people might want to logout or something to,
                            or something like that sometime....
                    */
                }
                // add user to session storage, because like, ya know, why not?
                sessionStorage.setItem("userId", user.id)
                sessionStorage.setItem("userName", user.name)
                // set active user state on app.js to user name
                this.props.setActiveUser(user.id)
                this.props.setUserName(user.name)
                this.props.showView("home")
            })
    }.bind(this);


    //changes the state to the value that is plugged into the field
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
                        {/* the form thing that gets the informational kind of stuff from the
                        like, whatever dude guy who is using the doo-dad */}

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