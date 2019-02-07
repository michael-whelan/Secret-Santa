import React, { Component } from "react";
import "../App.css";
import axios from "axios";

export default class LeftPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {user : this.props.user, userGroups: this.props.groups};
		this.initGroups();
	}

	handleChange = event => {
		this.setState({
			[event.target.type]: event.target.value
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.groups !== this.state.userGroups) {
			this.setState({ userGroups: nextProps.groups });
		}
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
				//this.setState({userGroups: res.data},);
				this.props.updateGroups(res.data);
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
		for(var k in this.state.userGroups){
			var group = this.state.userGroups[k];
			groupList.push(<li key={k} onClick={this.props.showGroupById.bind(this,k)}>{group.name}</li>);
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