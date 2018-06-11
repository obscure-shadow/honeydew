import React, { Component } from 'react';
import { Field, FieldBody, Control, Input, Button } from 'bloomer';

class Login extends Component {
    state = {
        username: "",
    }

    handleSubmit = function (evt) {
        evt.preventDefault()
        fetch(`http://localhost:8088/users?name=${this.state.username}`)
            .then(r => r.json())

            .then(users => {
                const user = users

                if (user === undefined) {
                    alert(this.state.errorMessage)
                }
                sessionStorage.setItem("userId", user.name)
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