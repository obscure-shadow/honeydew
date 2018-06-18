import React, {Component} from "react"
import { Field, Input, Button } from "bloomer";

class Edit extends Component {
    state = {
        currentView: "edit"

    }

    handleFormFieldChange = function (evt) {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }.bind(this)


    render() {
        return(
            <form className="addTool--form" onSubmit={this.handleSubmit}>
            <Field>
                <Input type="text"
                    id='taskName'
                    value={this.state.taskName}
                    onChange={this.handleFormFieldChange}
                    placeholder='name'></Input>
            </Field>
            <Field>
                <Input type="text"
                    id='taskDescription'
                    value={this.state.taskDescription}
                    onChange={this.handleFormFieldChange}
                    placeholder='description'></Input>
            </Field>
            <Field>
                <Input type="text"
                    id='estTime'
                    value={this.state.estTime}
                    onChange={this.handleFormFieldChange}
                    placeholder='estimated time to completion'></Input>
            </Field>
            <Field>
                <Input type="text"
                    id='supplyCost'
                    value={this.state.supplyCost}
                    onChange={this.handleFormFieldChange}
                    placeholder='estimated cost of supplies'></Input>
            </Field>
            <Button type="submit">Submit</Button>
        </form>
        )
    }
}
export default Edit