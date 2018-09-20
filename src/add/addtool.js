import React, { Component } from 'react';
import { Field, Input, Button } from "bloomer";
class Addtool extends Component {
    state = {
        toolName:"",
        toolPrice:"",
        toolStatus:"",
        owner: this.props.activeUser,
        errorMessage: "You must complete every field"
    }
    handleFormFieldChange = function (evt) {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }.bind(this)

    handleSubmit = function (evt) {
        evt.preventDefault()

        const newTool = {
            toolName:this.state.toolName,
            toolPrice:this.state.toolPrice,
            toolStatus:this.state.toolStatus,
            owner:this.state.owner,
        }

        fetch("http://localhost:8088/tool")
            .then(r => r.json())
            .then(tools => {

                let toolUniqueCheck = true

                tools.forEach(tool => {
                    if (tool.toolName === newTool.toolName) {
                        toolUniqueCheck = false
                    }
                })

                if (
                    this.state.toolName === "" ||
                    this.state.toolPrice === "" ||
                    this.state.toolStatus === "" ||
                    this.state.owner === null
                ) {
                    alert(this.state.errorMessage)
                } else if (!toolUniqueCheck) {
                    toolUniqueCheck = true
                    alert("Tool is already registered")
                } else {
                    fetch("http://localhost:8088/tool", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newTool)
                    })
                        .then(r => r.json())
                        .then(tool => {
                            this.props.showView("home")
                        })
                }
            })
    }.bind(this)

    render() {
        return(
            <form className="addTool--form" onSubmit={this.handleSubmit}>
              <h2> Add a tool:</h2>
                <Field>
                    <Input type="text"
                        id='toolName'
                        value={this.state.toolName}
                        onChange={this.handleFormFieldChange}
                        placeholder='name'></Input>
                </Field>
                <Field>
                    <Input type="text"
                        id='toolPrice'
                        value={this.state.toolPrice}
                        onChange={this.handleFormFieldChange}
                        placeholder='price'></Input>
                </Field>
                <Field>
                    <Input type="text"
                        id='toolStatus'
                        value={this.state.toolStatus}
                        onChange={this.handleFormFieldChange}
                        placeholder='owned yes or no'></Input>
                </Field>
                <Button type="submit">Submit</Button>
            </form>
        )
    }
}
export default Addtool
