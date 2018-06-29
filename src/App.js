import React, { Component } from "react";
import "./App.css";
import Login from "./auth/login.js";
import Home from "./dash/home.js";
import Nav from "./nav/nav.js";
import Tool from "./add/addtool.js"
import Task from "./add/addtask.js"
import Project from "./projects/project.js"
import Edit from "./projects/edit.js"
class App extends Component {
  state = {
    currentView: "login",
    activeUser: sessionStorage.getItem("userId"),
    userName: sessionStorage.getItem("userName"),
    viewProps: {},
    selected:"",
    ownedBoxes:[],
    ownedTotal:0,
    unownedTotal: 0,
    unownedBoxes:[],
    projects:[],
    projectId:"",
    projectTotal:0,
    projectTtotal:0
  };
    setActiveUser = function(val) {

    this.setState({
      activeUser: val
    });
  }.bind(this);

  setUserName = function(val) {

    this.setState({
      userName: val
    });
  }.bind(this);

  handleChange = function(event) {
    this.setState({selected:event.target.value});
    const relateTool = {
        project: this.state.viewProps.projectId,
        tool:event.target.value
    }

    // const toollist = this.state.tools.splice()
    // toollist.push(event.target.value)
    // this.setState({tools: toollist})
    this.addTool(relateTool)

}.bind(this)

addTool = function (e) {
    fetch(`http://localhost:8088/projectTools`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(e)
                })
}

  // View switcher -> passed to NavBar and Login
  // Argument can be an event (via NavBar) or a string (via Login)
  showView = (e, ...obj) => {
    let view = null

    // Click event triggered switching view
    if (e.hasOwnProperty("target")) {
        view = e.target.id.split("__")[1]

        // View switch manually triggered by passing in string
    } else {
        view = e
    }

    // If user clicked logout in nav, empty local storage and update activeUser state
    if (view === "logout") {
        this.setActiveUser(null)
    }

    // Update state to correct view will be rendered
    this.setState({
        currentView: view,
        viewProps: Object.assign({}, ...obj)
    })
  }

  View = () => {
    if (sessionStorage.getItem("userId") === null) {
      return (
        <Login setActiveUser={this.setActiveUser} showView={this.showView} />
      );
      /* TODO:

            make a splash page so that there will be something there instead of
            the extra log in field. perhaps some kind of like registration kinda
            deal thing, maybe... or whatever...

        */
    } else {
      switch (this.state.currentView) {
        case "home":
        default:
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
                        projectTtotal={this.state.projectTtotal}/>;
        case "tool":
          return <Tool activeUser={this.state.activeUser}
                        showView={this.showView}/>
        case "task":
          return <Task activeUser={this.state.activeUser}
                        showView={this.showView}/>
        case "project":
          return <Project {...this.state.viewProps}
                        activeUser={this.state.activeUser}
                        showView={this.showView}
                        handleChange={this.handleChange}
                        addTool={this.addTool}/>
        case "logout":
          return <strong>Please Log in!</strong>
          // <Login setActiveUser={this.setActiveUser} showView={this.showView} />
        case "edit":
          return <Edit {...this.state.viewProps} setActiveUser={this.setActiveUser} showView={this.showView} />
      }
    }
  };

  fetchHome = function () {
    fetch(`http://localhost:8088/tool?owner=${this.state.activeUser}&toolStatus=yes`)
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
    fetch(`http://localhost:8088/tool?owner=${this.state.activeUser}&toolStatus=no`)
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

    fetch(`http://localhost:8088/project?owner=${this.state.activeUser}`)
    .then(p=> p.json())
    .then(projects => {
        let proj = []
        let ptot = 0
        projects.forEach( project => {
            proj.push(project)
            ptot += parseInt(project.supplyCost, 10)
            // fetch(`http://localhost:8088/projectTools?project=${project.id}`)
            // .then(p => p.json())
            // .then(projectTools => {
            //     let ptools = []
            //     projectTools.forEach(t => ptools.push(t.tool))
            //     let ptmap = ptools.map( p => `id=${p}&`).join("")
            //     fetch(`http://localhost:8088/tool?${ptmap}`)
            //         .then(p => p.json())
            //         .then(tools => {
            //             let toolcost = 0
            //             tools.forEach(tool => {
            //                 if (tool.toolStatus === "no"){
            //                     toolcost += parseInt(tool.toolPrice, 10)
            //                 }
            //             })
            //             this.setState({
            //                 projectTtotal: toolcost
            //             })
            //         })
            // })
        })
        this.setState({
            projects: proj,
            projectTotal: ptot
        })
    })

}.bind(this)



  render() {
    return (
      <div>
        <Nav showView={this.showView}
          activeUser={this.state.activeUser}
          setActiveUser={this.setActiveUser}
          setUserName={this.setUserName}
          userName={this.state.userName}/>
        {this.View()}
      </div>
    );
  }
}

export default App;
