import { Route } from 'react-router-dom'
import React, { Component } from 'react'

class Views extends Component {
  View = () => {
          return <Home activeUser={this.state.activeUser}
            showView={this.showView}
            fetchHome={this.fetchHome}
            ownedBoxes={this.state.ownedBoxes}
            ownedTotal={this.state.ownedTotal}
            unownedTotal={this.state.unownedTotal}
            unownedBoxes={this.state.unownedBoxes}
            projects={this.state.projects}
            projectId={this.state.projectId}
            projectTotal={this.state.projectTotal}
            projectCost={this.projectCost}/>;
          return <Tool activeUser={this.state.activeUser}
            showView={this.showView}/>
          return <Task activeUser={this.state.activeUser}
            showView={this.showView}/>
          return <Project {...this.state.viewProps}
            activeUser={this.state.activeUser}
            showView={this.showView}
            handleChange={this.handleChange}
            addTool={this.addTool}/>
          return <strong>Please Log in!</strong>
          return <Edit {...this.state.viewProps}
            setActiveUser={this.setActiveUser}
            showView={this.showView} />
  }
}
