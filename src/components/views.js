import { Route } from 'react-router-dom'
import React, { Component } from 'react'

class Views extends Component {
  render() {

    return(
      <Home activeUser={this.state.activeUser}
            showView={this.showView}
            fetchHome={this.fetchHome}
            ownedBoxes={this.state.ownedBoxes}
            ownedTotal={this.state.ownedTotal}
            unownedTotal={this.state.unownedTotal}
            unownedBoxes={this.state.unownedBoxes}
            projects={this.state.projects}
            projectId={this.state.projectId}
            projectTotal={this.state.projectTotal}
            projectCost={this.projectCost}/>

      <Tool activeUser={this.state.activeUser}
        showView={this.showView}/>

      <Task activeUser={this.state.activeUser}
        showView={this.showView}/>

      <Project {...this.state.viewProps}
        activeUser={this.state.activeUser}
        showView={this.showView}
        handleChange={this.handleChange}
        addTool={this.addTool}/>

      <strong>Please Log in!</strong>

      <Edit {...this.state.viewProps}
        setActiveUser={this.setActiveUser}
        showView={this.showView} />
    )
  }
}
