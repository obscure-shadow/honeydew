import React, { Component } from 'react';
import { Column } from 'bloomer'
import { Notification } from 'bloomer/lib/elements/Notification';
import { Columns } from 'bloomer/lib/grid/Columns';
import { Box, Button } from 'bloomer';
import { Delete } from 'bloomer/lib/elements/Delete';
class Home extends Component {
    state = {
        currentView: "Home",
        ownedBoxes:[],
        ownedTotal:0,
        unownedTotal: 0,
        unownedBoxes:[],
        projects:[],
        projectId:"",
        projectTotal:0

    }
    componentDidMount() {
        fetch(`http://localhost:8088/tool?owner=${this.props.activeUser}&toolStatus=yes`)
        .then(p=> p.json())
        .then(tools => {
            let box = []
            let tot = 0
            tools.forEach( tool => {
                box.push(tool)
                tot += parseInt(tool.toolPrice, 10)
            })
            this.setState({
                ownedBoxes: box,
                ownedTotal: tot
            })
        })
        fetch(`http://localhost:8088/tool?owner=${this.props.activeUser}&toolStatus=no`)
        .then(p=> p.json())
        .then(tools => {
            let unbox = []
            let utot = 0
            tools.forEach( tool => {
                unbox.push(tool)
                utot += parseInt(tool.toolPrice, 10)
            })
            this.setState({
                unownedBoxes: unbox,
                unownedTotal: utot
            })
        })

        fetch(`http://localhost:8088/project?owner=${this.props.activeUser}`)
        .then(p=> p.json())
        .then(projects => {
            let proj = []
            let ptot = 0
            projects.forEach( project => {
                proj.push(project)
                ptot += parseInt(project.supplyCost, 10)
            })
            this.setState({
                projects: proj,
                projectTotal: ptot
            })
        })
    }


    deleteTool = function (t){
        t.preventDefault()
        this.setState({
            ownedBoxes:[],
            ownedTotal:0,
            unownedTotal: 0,
            unownedBoxes:[],
            projects:[],
            projectId:"",
            projectTotal:0
        })

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
            .then(
                fetch(`http://localhost:8088/tool?owner=${this.props.activeUser}&toolStatus=yes`)
                    .then(p=> p.json())
                    .then(tools => {
                        let box = []
                        let tot = 0
                            tools.forEach( tool => {
                                box.push(tool)
                                tot += parseInt(tool.toolPrice, 10)
                            })
                            this.setState({
                                ownedBoxes: box,
                                ownedTotal: tot
                            })
                        })
                        .then(fetch(`http://localhost:8088/tool?owner=${this.props.activeUser}&toolStatus=no`)
                        .then(p=> p.json())
                        .then(tools => {
                            let unbox = []
                            let utot = 0
                            tools.forEach( tool => {
                                unbox.push(tool)
                                utot += parseInt(tool.toolPrice, 10)
                            })
                            this.setState({
                                unownedBoxes: unbox,
                                unownedTotal: utot
                            })
                        }))

                        .then(fetch(`http://localhost:8088/project?owner=${this.props.activeUser}`)
                        .then(p=> p.json())
                        .then(projects => {
                            let proj = []
                            let ptot = 0
                            projects.forEach( project => {
                                proj.push(project)
                                ptot += parseInt(project.supplyCost, 10)
                            })
                            this.setState({
                                projects: proj,
                                projectTotal: ptot
                            })
                }))

            )

    }
}.bind(this)


    render() {
        return (
                <Columns isCentered>
                    <Column isSize='1/3'>Toolbox:
                        <Notification color="success">
                            {this.state.ownedBoxes.map(t => (
                                <Box key={t.id}> <h3>Tool: {t.toolName} </h3>
                                    Price: ${t.toolPrice}
                                    <Delete id={t.id} onClick={this.deleteTool}></Delete>
                                </Box>
                            ))}
                            <Box key='owned_total' hasTextColor="info">Total: ${this.state.ownedTotal}</Box>
                        </Notification>
                    </Column>
                    <Column isSize='1/3'>Tools To Get:
                        <Notification color="success">
                            {this.state.unownedBoxes.map(t => (
                                <Box key={t.id}> <h3>Tool: {t.toolName} </h3>
                                    Price: ${t.toolPrice}
                                    <Delete id={t.id} onClick={this.deleteTool}></Delete>
                                </Box>
                                ))}
                                <Box key='unowned_total' hasTextColor="info">Total: ${this.state.unownedTotal}</Box>
                        </Notification>
                    </Column>
                    <Column isSize='1/3'>Projects:
                        <Notification color="success">
                            {this.state.projects.map(p => (

                                <Box key={p.id}>
                                        {p.name}  <Button isSize='small'
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
                                <Box key='project_total' hasTextColor="info">Total: ${this.state.projectTotal}</Box>
                        </Notification>
                    </Column>
                </Columns>
        )
    }
}
export default Home