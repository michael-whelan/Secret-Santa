import React, { Component } from 'react';
import './App.css';
import Login from './Login/Login.js';
import HeaderBar from './Header/HeaderBar.js';
import LeftPanel from './LeftPanel/LeftPanel';
import GroupDetail from './MainDetails/Details.js';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



class App extends Component {
	constructor(props) {
		super(props);
		this.state = {page:"login", groups:"null",user:"null", activeGroup:"null",
		selectedGroup:"null"};
		this.checkLogin();
	}
	setAppState = ()=> {
		this.setState({page: "login"})
	}

	updateAppState = (newState)=>{
		this.setState({page: newState});
	}


	loginSuccess=(data)=>{
		console.log(data)
		var newUser = {"uuid":data.uuid,"email":data.email};
		this.setState({user: newUser, page:"home"});
	}

	checkLogin = () => {
		const uuidCookie = this.getCookie("uuid");
		console.log(uuidCookie);
		if(uuidCookie == null || uuidCookie.length < 10){
			return;
		}
		var authOptions = {
			method: 'get',
			url: 'http://localhost:8080/login',
			headers: {'X-User-ID': uuidCookie,
			'Access-Control-Allow-Origin': '*'},
			json: true
		   };
		axios(authOptions)
		.then(res => {
			if(res.status === 200){
				this.loginSuccess(res.data);
			}
			else if(res.status === 401){
				this.setAppState();
			}
		});
	}

	updateGroups = (groupList)=>{
		console.log(groupList);
		this.setState({groups: groupList});
	}

	doLogout = () =>{
		this.setState({user: "null", activeGroup:"null"});
	}

	testRun = () => {
		console.log(this.state);
		console.log(document.cookie);
		//console.log(cookies.get('uuid'));
	}

	getCookie = (cname)=> {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) === ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) === 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

	showGroup = (groupId) =>{
		this.setState({activeGroup: groupId});
	}

	reqListener = e => {

		//var data = JSON.parse(this.responseText);
		console.log(this.responseText)
	}
/*
<TextField id="header-search-bar" label="Search" margin="none" className="search-input"/>
				<Button  className="btn1" onClick={this.setAppState} variant="contained" color="primary">
					Search</Button>

					<input title="email" placeholder="enter you username" type="email"
				onChange={this.handleChange}/>
 */

	render() {
		if(this.state.page === "landing"){
			return (
				<div className="App">
					<div className="main">
						<div className = "dialogue">
							<div className="dialog-top">
							<h3>Sign in</h3>
							</div>
							<div id="search-area" className="search-holder">
							<TextField id="main-search-bar" className="text-btn-accom"
								variant="outlined" label="Search" margin="none"/>
							<Button variant="contained" color="primary">
								Search</Button>
							</div>
							<Button variant="contained" color="primary" className="main-btn high-top"
								onClick={this.setAppState}>Go to Login</Button>
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
						<LeftPanel user={this.state.user} updateGroups={this.updateGroups}
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
						<Login doLogin={this.loginSuccess} stateUpdate={this.updateAppState}
						user={this.state.user} pageState={this.state.page}></Login>
					</div>
				</div>
			);
		}
	}
}
export default App;