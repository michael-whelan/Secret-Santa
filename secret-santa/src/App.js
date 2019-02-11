import React, { Component } from 'react';
import './App.css';
import Login from './Login/Login.js';
import HeaderBar from './Header/HeaderBar.js';
import LeftPanel from './LeftPanel/LeftPanel';
import GroupDetail from './MainDetails/Details.js';
//import axios from 'axios';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {page:"login", groups:"null",user:"null", activeGroup:"null",
		selectedGroup:"null"};
	}
	setAppState = ()=> {
    	this.setState({page: "login"})
	}

	updateAppState = (newState)=>{
		this.setState({page: newState});
	}

	fillGroups = (groupList)=>{
		console.log(groupList);
		this.setState({groups: groupList});
	}

	doLogout = () =>{
		this.setState({user: "null", activeGroup:"null"});
	}

	testRun = () => {
		console.log(this.state.groups);
	}

	showGroup = (groupId) =>{
		this.setState({activeGroup: groupId});
	}

	reqListener = e => {

		//var data = JSON.parse(this.responseText);
		console.log(this.responseText)
	}

	render() {
		const page = this.state.page;
		if(this.state.page === "landing"){
			return (
				<div className="App">
					<div className="main">
						<div className = "dialogue">
							<input type="text"/>
							<button className="btn1" onClick={this.setAppState}>Go to Login</button>
						</div>
					</div>
				</div>
			);
		}
		else if(this.state.page ==="home"){
			return (
				<div className="App">
					<HeaderBar user={this.state.user} doLogout={this.doLogout} goLogin={this.setAppState}></HeaderBar>
					<div className="main">
						<LeftPanel user={this.state.user} updateGroups={this.fillGroups}
						showGroupById={this.showGroup} groups={this.state.groups}></LeftPanel>
						<GroupDetail activeGroupId={this.state.activeGroup}
						 groups={this.state.groups}></GroupDetail>
					</div>
				</div>
			);
		}
		else{
			return (
				<div className="App">
					<div className="main">
						<Login stateUpdate={this.updateAppState} user={this.state.user} pageState={this.state.page}></Login>
					</div>
				</div>
			);
		}
	}
}
export default App;
