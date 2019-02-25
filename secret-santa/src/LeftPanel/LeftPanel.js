import React, { Component } from "react";
import "./LeftPanel.css";
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
		this.dialog = [
			{"type":"text", "label":"Group Name", "writeTo": ""}
		];
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

	createGroup = event => {
		event.preventDefault();

		var config = {
			headers : {'X-User-ID': this.state.user.uuid,
			'Content-Type': 'application/json'
			}
		};

		var data = {
			'groupname':this.dialog[0].writeTo
		};

		axios.post('http://localhost:8080/creategroup', data,config)
		.then(res => {
			if(res.status === 200){
				if(res.data.success){
					this.setState({ cgDialogOpen : false });
					//continue to deal with new group
				}

				this.getGroups();
			}
		})
		.catch(error => {
			console.log(error);
		});
	}

	openDialog = () =>{
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
					<Button variant="outlined" color="primary" onClick={this.openDialog}>
						Create Group
					</Button>
					<Dialog user= {this.state.user} openDialog = {this.state.cgDialogOpen} title={"Create Group"}
					elemList={this.dialog} text={this.diText} btnName={"Create"} btnAction={this.createGroup}/>
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