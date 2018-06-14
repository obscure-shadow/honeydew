import React, { Component } from 'react';
import { Column } from 'bloomer'
import { Notification } from 'bloomer/lib/elements/Notification';
import { Columns } from 'bloomer/lib/grid/Columns';
import { Box } from 'bloomer/lib/elements/Box';
class Home extends Component {
    state = {
        currentView: "Home",
        boxes:[]
    }
    componentDidMount() {
        return fetch(`http://localhost:8088/tool?owner=${this.props.activeUser}`)
            .then(p=> p.json())
            .then(tools => {

                let box = []
                    tools.forEach( tool => box.push(tool))
                    this.setState({
                        boxes: box
                    })
            })
    }


    render() {
        return (
                <Columns isCentered>
                    <Column isSize='1/3'>Toolbox:
                        <Notification color="success">
                            {this.state.boxes.map(t => (
                                <Box key={t.id}> <h3>Tool: {t.toolName} </h3> Price: ${t.toolPrice} </Box>
                            ))}
                        </Notification>
                    </Column>
                    <Column isSize='1/3'>Tools To Get:
                        <Notification color="success"></Notification>
                    </Column>
                    <Column isSize='1/3'>Projects:
                        <Notification color="success"></Notification>
                    </Column>
                </Columns>
        )
    }
}
export default Home