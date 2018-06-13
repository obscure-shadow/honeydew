import React, { Component } from 'react';
import { Column } from 'bloomer'
import { Notification } from 'bloomer/lib/elements/Notification';
class Home extends Component {
    state = {
        currentView: "Home",
    }
    render() {
        return (
            <body>
                <Column isSize='1/3'>
                    <Notification color="success"></Notification>
                </Column>
                <Column isSize='1/3'>
                    <Notification color="success"></Notification>
                </Column>
                <Column isSize='1/3'>
                    <Notification color="success"></Notification>
                </Column>
            </body>
        )
    }
}
export default Home