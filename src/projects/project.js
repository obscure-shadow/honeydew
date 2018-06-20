import React, {Component} from 'react'
import {Box, Section} from 'bloomer'
import { Button } from 'bloomer/lib/elements/Button';
import { Delete } from 'bloomer/lib/elements/Delete';


class Project extends Component {
    state = {
        currentView:"Project",
        project:[],
        tools:[],
        unusedTools:[],
        selected:"",
        deleted:""
    }


    componentDidMount() {
        let toolsId = []
        this.setState({tools:[]})
        this.setState({unusedTools:[]})
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

            t.forEach(tool => toolsId.push(+tool.tool))
            if (toolsId.length >0 ) {
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
                .then(()=>{
                    //pull list of unrelated tools
                    fetch(`http://localhost:8088/tool`)
                    .then(p => p.json())
                    .then(tools => {
                        let unTool = []
                        tools.forEach( tool => {
                            if (toolsId.indexOf(tool.id) < 0){

                                unTool.push(tool)
                            }
                        })
                        this.setState({
                            unusedTools: unTool
                        })
                    })
                })
            }else{
                fetch(`http://localhost:8088/tool`)
                    .then(p => p.json())
                    .then(tools => {
                        let unTool = []
                        tools.forEach( tool => {
                            if (toolsId.indexOf(tool.id) < 0){

                                unTool.push(tool)
                            }
                        })
                        this.setState({
                            unusedTools: unTool
                        })
                    })
            }
        })

    }

    projectHandler = function(event) {
        event.preventDefault()
        this.props.handleChange(event)
        let toollist = this.state.tools
        const eventval = event.target.value
        fetch(`http://localhost:8088/tool?Id=${eventval}`)
            .then(p => p.json())
            .then(tools => {
                tools.forEach( t => {
                    if(parseInt(eventval, 10) === t.id){
                        toollist.push(t)
                    }
                })
                let newunUsed = []
                this.state.unusedTools.forEach(tool => {
                    if (parseInt(eventval, 10) !== tool.id){
                        newunUsed.push(tool)
                    }
                })
                this.setState({
                    tools: toollist,
                    unusedTools: newunUsed
                })

            })
    }.bind(this)

    deleteHandler = function(v) {
        v.preventDefault()

        if (v.hasOwnProperty('target')){
            let del = v.target.id
            let newToolArr = []
            let newUut = this.state.unusedTools
            // iterate through list of tools currently being used in the project
            this.state.tools.forEach( tool => {
                //if the id of the deleted tool != the tool.id then push it to the new tool id
                //or push the unused tool to the new unused tool array, then set the new arrays
                //to state
                if  (parseInt(del, 10) !== tool.id){
                    newToolArr.push(tool)
                }else{
                    newUut.push(tool)
                }
            })
            this.setState({
                tools: newToolArr,
                unusedTools: newUut
            })
            fetch(`http://localhost:8088/projectTools?project=${this.props.projectId}&tool=${del}`)
            .then(p => p.json())
            .then(relationships => {
                relationships.forEach(rls => {
                    fetch(`http://localhost:8088/projectTools/${rls.id}`,{
                        method:"DELETE"
                    })
                })
            })
        }
    }.bind(this)


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
                        <li key={t.id}>{t.toolName}
                            <Delete id={t.id} onClick={this.deleteHandler}></Delete>
                        </li>
                    ))}
                    {/* map unrelated tools into dropdown menu and then have the selection added to
                        the tool relationship table */}
                    <select value={this.state.selected} onChange={this.projectHandler}>
                        {/* //make on change event handler*/}
                        {/* //map of options on array of tools  */}
                        <option value="default">Add a Tool</option>
                        {this.state.unusedTools.map( t => (
                            <option key={t.id} value={t.id}>{t.toolName}</option>
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