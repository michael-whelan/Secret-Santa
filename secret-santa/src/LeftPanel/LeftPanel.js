import React, { Component } from "react";
import "../App.css";
import axios from "axios";

export default class LeftPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {user : this.props.user, userGroups: "null"};
		this.initGroups();
	}

	handleChange = event => {
		this.setState({
			[event.target.type]: event.target.value
		});
	}

	handleLogout = event => {
		event.preventDefault();
	}

	initGroups(){
		if(this.state.user == "michael@g.c"){
			var config = {
			headers: {'X-User-Name': this.state.user,
				'X-User-Pass': 'qwert'}
			};
			axios.get('http://localhost:8080/getstuff', config)
			.then(res => {
				console.log(res);
				this.setState({userGroups: res.data});
			});
		}
	}

	showDeets=(keyName)=>{
		console.log(keyName);
		console.log(this.state.userGroups[keyName]);
		//this.setState({this.props.groupDeets: this.state.userGroups[keyName]})
	}

	render() {
		var groupList =[];
		var iter = 0;
		for(var k in this.state.userGroups){
			groupList.push(<li key={iter} onClick={this.showDeets.bind(this,k)}>{k}</li>);
			++iter;
		}

		return (
			<div>
			{this.state.user!="null" && this.state.userGroups!="null" &&
				<div className="left-panel">
					<button className="btn1" onClick={this.setAppState}>Create Group</button>
					<ul>
						{
							groupList
						}
					</ul>
				</div>
			}
			<div className="right"></div>
			</div>
		);
	}
}