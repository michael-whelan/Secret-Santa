import React, { Component } from 'react';
import './App.css';
import Login from './Login/Login.js';
import HeaderBar from './Header/HeaderBar.js';
import LeftPanel from './LeftPanel/LeftPanel';
import GroupDetail from './MainDetails/Details.js';
import axios from 'axios';

class App extends Component {
	constructor(props) {	
		super(props);
		this.state = {page:"login", groups:"unloaded"};
	}
	setAppState = ()=> {
    	this.setState({page: "login"})
		console.log(this.state);
	}

	updateAppState = (newState)=>{
		this.setState({page: newState})
		console.log(this.state);
	}

	testRun = () => {
		/*axios.get('../public/users.json') // JSON File Path
		.then( response => {
			this.setState({
				userList: response.data,
				groups: "loaded"
			});
		})
		var oReq = new XMLHttpRequest();
		oReq.onload = this.reqListener;
		oReq.open("get", "./db.json", true);
		oReq.send();*/
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
					<HeaderBar></HeaderBar>
					<div className="main">					
						<LeftPanel></LeftPanel>
						<GroupDetail></GroupDetail>
					</div>
				</div>
			);
		}
		else{
			return (
				<div className="App">
					<div className="main">
						<Login stateUpdate={this.updateAppState}></Login>
					</div>
				</div>
			);
		}
	}
}
export default App;
