import React, { Component } from "react";
import "../App.css";
import Button from '@material-ui/core/Button';

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

export default class GroupDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {groups: this.props.groups, activeGroup: null};
		this.people =[];
	}

	handleChange = event => {
		console.log(event.target.key,event.target.value);
		clearTimeout(this.timer);
		this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
		/*this.setState({
			[event.target.type]: event.target.value
		});*/
	}

	handleKeyDown = e => {
		if (e.keyCode === ENTER_KEY) {
			clearTimeout(this.timer);
			this.triggerChange();
		}
	}

	triggerChange = () => {
		console.log("trigger");
		/*const { value } = this.state;
		this.props.onChange(value);*/
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
		console.log(this.people);
	}

	addPerson = (single) =>{
		var addDirect = false;
		if (single === null){
			single = {"name":"","email":"","person_id":"new"};
			addDirect = true;
		}
		var person = <div className="person">
				<Button variant="outlined" color="primary"
				onClick={this.showAlert.bind(this,"Are you sure you want to delete: "+single.name)}>-</Button>
				<input type="text" key={"name-"+single.person_id} defaultValue={single.name}
					onChange ={this.handleChange}  onKeyDown={this.handleKeyDown}/>
				<input type="text" key={"email-"+single.person_id} defaultValue={single.email}/>
				<Button variant="outlined" color="primary"
				onClick={this.showAlert.bind(this,"You are adding a not field")}>Nots</Button>
			</div>

		if(!addDirect){return person;}
		var newGroup = this.state.activeGroup;
		newGroup.people.push(person);
		this.setState({activeGroup: newGroup});
	}

	generatePeople = () =>{
		var list =[];

		if(typeof this.state.activeGroup !== "object" || this.state.activeGroup === null){
			return [];
		}
		var peopleList = this.state.activeGroup.people;
		for(var i =0; i < peopleList.length;++i){
			var single = peopleList[i];
			list.push(this.addPerson(single));
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
				<Button variant="outlined" color="primary"
					onClick={this.addPerson.bind(this,null)}>+</Button>
				</>
			):(
				<p> Nothing to see here</p>
			)}
			</div>
		);
	}
}