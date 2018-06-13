import React, { Component } from 'react';
import { Column } from 'bloomer'
import { Notification } from 'bloomer/lib/elements/Notification';
import { Columns } from 'bloomer/lib/grid/Columns';
class Home extends Component {
    state = {
        currentView: "Home",
    }
    render() {
        return (
            <body>
                <Columns isCentered>
                    <Column isSize='1/3'>Toolbox:
                        <Notification color="success"></Notification>
                    </Column>
                    <Column isSize='1/3'>Tools To Get:
                        <Notification color="success"></Notification>
                    </Column>
                    <Column isSize='1/3'>Projects:
                        <Notification color="success"></Notification>
                    </Column>
                </Columns>
            </body>
        )
    }
}
export default Home