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
			//console.log(res);
			this.setState({userGroups: res.data});
		});
	}
	}

	render() {
		return (
			<div>
			{this.state.user!="null" && this.state.userGroups!="null" &&
			<div className="left-panel">
				<button className="btn1" onClick={this.setAppState}>Create Group</button>
				<ul>
					<li>Item 1</li>
					<li>Item 2</li>
					<li>Item 3</li>
					<li>Item 4</li>
					<li>Item 5</li>
				</ul>
			</div>
			}
			<div className="right"></div>
			</div>
		);
	}
}