import React, {Component} from 'react'
import {Box, Section} from 'bloomer'
import { Button } from 'bloomer/lib/elements/Button';

class Project extends Component {
    state = {
        currentView:"Project",
        project:[],
    }

    componentDidMount() {
        fetch(`http://localhost:8088/project?owner=${this.props.activeUser}&id=${this.props.projectId}`)
            .then(p=> p.json())
            .then(projs => {
                let proj = []
                projs.forEach( p => proj.push(p))
                this.setState({
                    project: proj,
                })
            })
    }
    render(){
        return(
            <Section>
            {this.state.project.map(p => (
                <Box key={p.id}>
                    <strong>{p.name}</strong>
                    <p><strong>Description:</strong> {p.description}</p>
                    <p><strong>Estimated Time:</strong> {p.estTime}</p>
                    <p><strong>Estimated Supply Cost:</strong> {p.supplyCost}</p>
                    <p><strong>Finished:</strong> {p.finished}</p>
                    <p><strong>Time taken to complete:</strong> {p.finalTime}</p>
                    <Button isColor='success'
                            isOutlined
                            onClick={this.props.showView}
                            id="task__edit">
                        Edit
                    </Button>
                </Box>
            ))}
            </Section>
        )
    }

}
export default Project