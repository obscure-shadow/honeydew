import React, { Component } from 'react';
import { Field, FieldBody, Checkbox, Control, Input, Button } from 'bloomer';

class Login extends Component {
    state = {
        username: "",
    }
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