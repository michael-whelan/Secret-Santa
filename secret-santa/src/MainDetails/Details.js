import React, { Component } from "react";
import "../App.css";
import Button from '@material-ui/core/Button';

export default class GroupDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {groups: this.props.groups, activeGroup: null};
		this.people =[];
	}

	handleChange = event => {
		this.setState({
			[event.target.type]: event.target.value
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.groups !== this.state.groups) {
			this.setState({ groups: nextProps.groups });
		}

		if (nextProps.activeGroup !== this.state.activeGroup) {
			this.people =[];
			this.setState({ activeGroup: nextProps.activeGroup });
		}
	}

	showAlert = (msg) =>{
		alert(msg);
	}


	generatePeople = () =>{
		var list =[];

		if(typeof this.state.activeGroup !== "object" || this.state.activeGroup === null){
			return [];
		}
		var peopleList = this.state.activeGroup.people;
		for(var i =0; i < peopleList.length;++i){
			var single = peopleList[i];
			var person = <div className="person">
				<Button variant="outlined" color="primary"
				onClick={this.showAlert.bind(this,"Are you sure you want to delete: "+single.name)}>-</Button>
				<input type="text" key={"name"+i} defaultValue={single.name}/>
				<input type="text" key={"email"+i} defaultValue={single.email}/>
				<Button variant="outlined" color="primary"
				onClick={this.showAlert.bind(this,"You are adding a not field")}>Nots</Button>
			</div>
			list.push(person);
		}
		return list;
	}

	render() {
		var group = {};

		if(this.state.groups != null){
			group = this.state.activeGroup;
		}

		this.people = this.generatePeople();
		console.log(this.people);
		return (
			<div className="Details">
			{this.props.activeGroupId!=="null" ? (
				<>
				<h1>{group.group_name}</h1>
				{this.people}
				</>
			):(
				<p> Nothing to see here</p>
			)}
			</div>
		);
	}
}