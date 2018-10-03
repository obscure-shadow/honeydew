import React, { Component } from 'react';
import { Field, Input, Button } from "bloomer";
class Task extends Component {
    state = {
        taskName:"",
        taskDescription:"",
        estTime:"",
        supplyCost:"",
        finalTime:"",
        finished:"no",
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
            name:this.state.taskName,
            description: this.state.taskDescription,
            estTime: this.state.estTime,
            supplyCost: this.state.supplyCost,
            finalTime: this.state.finalTime,
            finished: this.state.finished,
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
                    this.state.taskName === "" ||
                    this.state.taskDescription === "" ||
                    this.state.estTime === "" ||
                    this.state.supplyCost === "" ||
                    this.state.owner === null
                ) {
                    //debugger
                    alert(this.state.errorMessage)
                } else if (!projectUniqueCheck) {
                    projectUniqueCheck = true
                    alert("Project is already registered")
                } else {
                    fetch("http://localhost:8088/project", {
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
              <h2>Add a new project:</h2>
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
export default Task
