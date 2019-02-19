import React, { Component } from "react";
import "../App.css";
import Button from '@material-ui/core/Button';
import axios from "axios";

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

export default class GroupDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {groups: this.props.groups, activeGroup: null, changeAllowed:true, user: this.props.user};
		this.people =[];
	}

	handleChange = event => {
		console.log(event.target.value,event.target.title);
		//*****Should add a color to say changed/unsaved ******
		//clearTimeout(this.timer);
		//this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
		/*this.setState({
			[event.target.type]: event.target.value
		});*/
	}

	handleKeyDown = e => {
		if (e.keyCode === ENTER_KEY) {
			var parts = e.target.title.split("-");
			//clearTimeout(this.timer);
			this.triggerChange(e.target.value, parts[0],parts[1],parts[2]);
		}
	}

	triggerChange = (val, group_id,col,id) => {
		var authOptions = {
			method: 'put',
			url: 'http://localhost:8080/updateperson',
			headers: {'X-User-ID': this.state.user.uuid,
			'Access-Control-Allow-Origin': '*'},
			data : {
				'group_id':group_id,'id':id,'col': col,'newVal': val
			},
			json: true
		};

		if( id === "new" ||id === "undefined"){
			authOptions.method = "post";
			authOptions.url = 'http://localhost:8080/addperson';
		}

		axios(authOptions)
		.then(res => {
			if(res.status === 200){
				if(res.data.success){
					console.log(res.data)
					//continue to deal with new group
				}
			}
		})
		.catch(error => {
			console.log(error);
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

		if (nextProps.user !== this.state.user) {
			this.setState({ user: nextProps.user });
		}
	}

	showAlert = (msg) =>{
		alert(msg);
		console.log(this.people);
	}

	addPerson = (sing) =>{
		var addDirect = false;
		var single = sing;
		if (single === null){
			single = {"name":"","email":"","person_id":"new"};
			addDirect = true;
		console.log("adding new",single);

		}
		const gid = this.state.activeGroup.group_id;
		var person = <div className="person">
				<Button variant="outlined" color="primary"
				onClick={this.showAlert.bind(this,"Are you sure you want to delete: "+single.name)}>-</Button>
				<input type="text" key={"name-"+single.person_id} title={gid+"-name-"+single.person_id}
					defaultValue={single.name} onChange ={this.handleChange}  onKeyDown={this.handleKeyDown}/>
				<input type="text" key={"email-"+single.person_id} title={gid+"-email-"+single.person_id}
					defaultValue={single.email} onChange ={this.handleChange}  onKeyDown={this.handleKeyDown}/>
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