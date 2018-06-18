import React, {Component} from 'react'
import {Box, Section} from 'bloomer'
import { Button } from 'bloomer/lib/elements/Button';


class Project extends Component {
    state = {
        currentView:"Project",
        project:[],
        tools:[],
        unusedTools:[],
    }

    componentDidMount() {
        let toolsId = []
        //fetch single project
        fetch(`http://localhost:8088/project?owner=${this.props.activeUser}&id=${this.props.projectId}`)
            .then(p=> p.json())
            .then(projs => {
                let proj = []
                projs.forEach( p => proj.push(p))
                this.setState({
                    project: proj,
                })
            })
            //fetch list of tool relationships by projectID & set to state
        fetch(`http://localhost:8088/projectTools?project=${this.props.projectId}`)
            .then(p=> p.json())
            //probably create a tools array, and map id of them into one request to find all
            //related tools
            .then(t => {
                t.forEach(tool => toolsId.push(tool.tool))
                const tmap = toolsId.map(ts => `id=${ts}&`).join("")
                fetch(`http://localhost:8088/tool?${tmap}`)
                    .then(p => p.json())
                    .then(tools => {
                        let toolList = []
                        tools.forEach( tool => toolList.push(tool))
                        this.setState({
                            tools: toolList,
                        })
                    })
                //pull list of unrelated tools
                const utmap = toolsId.map(ts => `id_ne=${ts}&`).join("")
                fetch(`http://localhost:8088/tool?${utmap}`)
                    .then(p => p.json())
                    .then(tools => {
                        let unTool = []
                        tools.forEach( tool => unTool.push(tool))
                        this.setState({
                            unusedTools: unTool
                        })
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
                    {/* map list of tools */}
                    <p><strong>Tools:</strong></p>
                    {this.state.tools.map( t => (
                        <li key={t.id}>{t.toolName}</li>
                    ))}
                    {/* map unrelated tools into dropdown menu and then have the selection added to
                        the tool relationship table */}
                    <select>
                        {/* //make on change event handler*/}
                        {/* //map of options on array of tools  */}
                        <option value="default">Add a Tool</option>
                        {this.state.unusedTools.map( t => (
                            <option key={t.id}>{t.toolName}</option>
                        ))}
                    </select>
                    <Button isColor='success'
                            isOutlined
                            onClick={
                                () => {
                                    this.props.showView("edit", {
                                        projectId: p.id
                                    })
                                }
                            }
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