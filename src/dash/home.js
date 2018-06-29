import React, { Component } from 'react';
import { Column } from 'bloomer'
import { Notification } from 'bloomer/lib/elements/Notification';
import { Columns } from 'bloomer/lib/grid/Columns';
import { Box, Button } from 'bloomer';
import { Delete } from 'bloomer/lib/elements/Delete';
class Home extends Component {
    state = {
        currentView: "Home",
    }
    componentDidMount() {
        this.props.fetchHome()
    }

    deleteTool = function (t){

        if (t.hasOwnProperty("target")){
            let id = t.target.id
            fetch(`http://localhost:8088/tool/${id}`,{
                method:"DELETE"
            })
            fetch(`http://localhost:8088/projectTools?tool=${id}`)
            .then(p => p.json())
            .then(relationships => {
                relationships.forEach(rls => {
                    fetch(`http://localhost:8088/projectTools/${rls.id}`,{
                        method:"DELETE"
                    })
                })
            })
            .then(() => this.props.fetchHome())
        }
    }.bind(this)

    purchaseTool = function (t) {
        if (t.hasOwnProperty){
            let id = t.target.id
            fetch(`http://localhost:8088/tool/${id}`,{
                method:"PATCH",
                headers: {
                    "Content-Type": "application/json"
                    },
                body: JSON.stringify({toolStatus: "yes"})
            })
            .then(() => this.props.fetchHome())
        }
    }.bind(this)

    lostTool = function (t) {
        if (t.hasOwnProperty){
            let id = t.target.id
            fetch(`http://localhost:8088/tool/${id}`,{
                method:"PATCH",
                headers: {
                    "Content-Type": "application/json"
                    },
                body: JSON.stringify({toolStatus: "no"})
            })
            .then(() => this.props.fetchHome())
        }
    }.bind(this)

    render() {
        return (
                <Columns isCentered>
                    <Column isSize='1/3'>Toolbox:
                        <Notification color="success">
                            {this.props.ownedBoxes.map(t => (
                                <Box key={t.id}> <h3>Tool: {t.toolName} </h3>
                                    Price: ${t.toolPrice}
                                    <Delete id={t.id} onClick={this.deleteTool}></Delete>
                                    <Button id={t.id}
                                        onClick={this.lostTool}
                                        isColor="success"
                                        isOutlined
                                        isSize="small"
                                        isPulled="right">Lost</Button>
                                </Box>
                            ))}
                            <Box key='owned_total' hasTextColor="info">Total: ${this.props.ownedTotal}</Box>
                        </Notification>
                    </Column>
                    <Column isSize='1/3'>Tools To Get:
                        <Notification color="success">
                            {this.props.unownedBoxes.map(t => (
                                <Box key={t.id}> <h3>Tool: {t.toolName} </h3>
                                    Price: ${t.toolPrice}
                                    <Delete id={t.id} onClick={this.deleteTool}></Delete>
                                    <Button id={t.id}
                                        onClick={this.purchaseTool}
                                        isColor="success"
                                        isSize="small"
                                        isOutlined
                                        isPulled="right">Purchase</Button>
                                </Box>
                                ))}
                                <Box key='unowned_total' hasTextColor="info">Total: ${this.props.unownedTotal}</Box>
                        </Notification>
                    </Column>
                    <Column isSize='1/3'>Projects:
                        <Notification color="success">
                            {this.props.projects.map(p => (

                                <Box key={p.id}>
                                        {p.name}
                                        <Button isSize='small'
                                                isColor='success'
                                                isOutlined
                                                onClick={
                                                    () => {
                                                        this.props.showView("project", {
                                                            projectId: p.id
                                                        })
                                                    }
                                                }
                                                id="task__project"
                                                isPulled='right'
                                                >
                                            Details
                                        </Button>
                                        <p>Supply Cost: ${p.supplyCost}</p>
                                    </Box>
                                ))}
                                <Box key='project_total' hasTextColor="info">Total: ${this.props.projectTotal}</Box>
                        </Notification>
                    </Column>
                </Columns>
        )
    }
}
export default Home