import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import Dialog from "../Dialog/Dialog.js"
import Button from '@material-ui/core/Button';

export default class LeftPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {user : this.props.user, userGroups: this.props.groups,
			cgDialogOpen:false};
		this.initGroups();
		this.diText="";
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

		if(nextProps.user !== this.state.user){
			console.log("You logged out");
			this.setState({ user: nextProps.user });
		}
	}

	handleLogout = event => {
		event.preventDefault();
	}

	initGroups(){
		var config = {
		headers: {'X-User-ID': this.state.user.uuid}
		};
		axios.get('http://localhost:8080/getstuff', config)
		.then(res => {
			this.props.updateGroups(res.data);
		});
	}

	createGroup=()=>{
		this.setState({ cgDialogOpen : true });
	}

	render() {
		var groupList =[];
		for(var k in this.state.userGroups){
			var group = this.state.userGroups[k];
			groupList.push(<li key={k} onClick={this.props.showGroupById.bind(this,k)}>{group.name}</li>);
		}

		return (
			<div>
			{this.state.user!=="null" && this.state.userGroups!=="null" &&
				<div className="left-panel">
					<Button variant="outlined" color="primary" onClick={this.createGroup}>
						Create Group
					</Button>
					<Dialog user= {this.state.user} openDialog = {this.state.cgDialogOpen} title={"Create Group"}
					inputName={"Group Name"} text={this.diText} btnName={"Create"}/>
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