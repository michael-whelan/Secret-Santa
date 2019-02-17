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
		this.getGroups();
		this.diText="";
		this.showGroups = false;
	}

	handleChange = event => {
		this.setState({
			[event.target.type]: event.target.value
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.groups !== this.state.userGroups) {
			this.showGroups=true;
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

	getGroups(){
		var config = {
		headers: {'X-User-ID': this.state.user.uuid}
		};
		axios.get('http://localhost:8080/getgroups', config)
		.then(res => {
			this.props.updateGroups(res.data);
		});
	}

	createGroup=()=>{
		this.setState({ cgDialogOpen : true });
	}

	render() {
		var groupList =[];
		console.log(this.state.userGroups);
		if(this.state.userGroups !=="null" && this.state.userGroups !==null){
			for (var i =0; i < this.state.userGroups.length; ++i){
				var group = this.state.userGroups[i];
				console.log(group);
				groupList.push(<li key={i} onClick={this.props.showGroupById.bind(this,group.group_id,i)}>{group.group_name}</li>);
			}
		}

		return (
			<div>
			{this.state.user!=="null" &&
				<div className="left-panel">
					<Button variant="outlined" color="primary" onClick={this.createGroup}>
						Create Group
					</Button>
					<Dialog user= {this.state.user} openDialog = {this.state.cgDialogOpen} title={"Create Group"}
					inputName={"Group Name"} text={this.diText} getGroups={this.getGroups} btnName={"Create"}/>
					{this.state.userGroups!=="null"&&
					<ul>
						{
							groupList
						}
					</ul>
					}
				</div>
			}
			<div className="right"></div>
			</div>
		);
	}
}