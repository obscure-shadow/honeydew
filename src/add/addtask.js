import React, { Component } from 'react';
import { Field, Input, Button } from "bloomer";
class Task extends Component {
    state = {
        name:"",
        description:"",
        estTime:"",
        supplyCost:"",
        startTime:"",
        endTime:"",
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

        const newTask = {
            name:this.state.name,
            description: this.state.description,
            estTime: this.state.estTime,
            supplyCost: this.state.supplyCost,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            owner: this.props.activeUser,
        }

        fetch("http://localhost:8088/project")
            .then(r => r.json())
            .then(projects => {

                let projectUniqueCheck = true

                projects.forEach(project => {
                    if (project.name === newTask.name) {
                        projectUniqueCheck = false
                    }
                })

                if (
                    this.state.name === "" ||
                    this.state.description === "" ||
                    this.state.estTime === "" ||
                    this.state.supplyCost === "" ||
                    this.state.owner === null
                ) {
                    alert(this.state.errorMessage)
                } else if (!projectUniqueCheck) {
                    projectUniqueCheck = true
                    alert("Project is already registered")
                } else {
                    fetch("http://localhost:8088/tool", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newTask)
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
                        falue={this.state.toolStatus}
                        onChange={this.handleFormFieldChange}
                        placeholder='owned yes or no'></Input>
                </Field>
                <Button type="submit">Submit</Button>
            </form>
        )
    }
}
export default Task