import React, { Component } from "react";
import "../App.css";
import Button from '@material-ui/core/Button';
import axios from "axios";
import Dialog from "../Dialog/Dialog.js"

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

export default class GroupDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {groups: this.props.groups, activeGroup: null, changeAllowed:true, user: this.props.user,
		people :[], notListDialogOpen: false, dialog: null, openPerson :null};
	}

	handleChange = event => {
		event.target.className = "unsaved";
		console.log(event.target);
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
			this.triggerChange(e.target.value, parts[0],parts[1],parts[2],e.target.id);
		}
	}

	triggerChange = (val, group_id,col,id,elemId) => {
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
			if(res.status === 200){//updated person
				if(res.data.success){
					console.log(elemId,res.data);
					document.getElementById(elemId).classList.remove("unsaved");
				}
			}
			if(res.status === 202){//added person
				if(res.data.success){
					this.props.updateGroup(res.data.updated_g_id, res.data.updated_group[0]);
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

		this.setState({activeGroup: nextProps.activeGroup }, ()=> this.generatePeople());

		if (nextProps.user !== this.state.user) {
			this.setState({ user: nextProps.user });
		}
	}

	addNot = (person_id, not_id) =>{
		console.log(person_id, not_id);
	}

	showAlert = (msg) =>{
		alert(msg);
		console.log(this.state.people);
	}

	openDialog = (event,nots) =>{
		console.log(event,nots);
		this.setState({ notListDialogOpen : true, openPerson: event.target.id, nots: nots});
	}
	closeDialog = () =>{
		this.setState({ notListDialogOpen : false });
	}

	addPerson = (sing) =>{
		var addDirect = false;
		var single = sing;
		if (single === null){
			single = {"name":"","email":"","person_id":"new"};
			addDirect = true;
		}
		const gid = this.state.activeGroup.group_id;
		var person = <div className="person" key={"person-"+single.person_id}>
				<Button variant="outlined" color="primary"
				onClick={this.showAlert.bind(this,"Are you sure you want to delete: "+single.name)}>-</Button>
				<input type="text" key={"name-"+single.person_id} id={"pname-"+single.person_id} title={gid+"-name-"+single.person_id}
					defaultValue={single.name} onChange ={this.handleChange}  onKeyDown={this.handleKeyDown}/>
				<input type="text" key={"email-"+single.person_id} id={"pemail-"+single.person_id} title={gid+"-email-"+single.person_id}
					defaultValue={single.email} onChange ={this.handleChange}  onKeyDown={this.handleKeyDown}/>
				<Button variant="outlined" color="primary" key={single.person_id} id={single.person_id}
				onClick={this.openDialog.bind(single.nots)}>Nots</Button>
			</div>

		if(!addDirect){return person;}
		var newGroup = this.state.activeGroup;
		newGroup.people.push(person);
		this.setState({activeGroup: newGroup});
	}

	generatePeople = () =>{
		var list =[];
		var dialogOptions = [];
		if(typeof this.state.activeGroup !== "object" || this.state.activeGroup === null){
			return [];
		}
		var peopleList = this.state.activeGroup.people;
		for(var i =0; i < peopleList.length;++i){
			var single = peopleList[i];
			list.push(this.addPerson(single));
			if(single !== null){
				dialogOptions.push({"label": single.name, "key":single.person_id});
			}
		}
		this.setState({people: list, dialog: dialogOptions});
	}

	render() {

		return (
			<div className="Details">
			{this.props.activeGroupId!=="null" ? (
				<>
				<h1>{this.state.activeGroup.group_name}</h1>
				{this.state.people}
				<Button variant="outlined" color="primary"
					onClick={this.addPerson.bind(this,null)}>+</Button>
				</>
			):(
				<p> Nothing to see here</p>
			)}
			{this.state.activeGroup  ?(
				<Dialog user= {this.state.user} openDialog = {this.state.notListDialogOpen} title={"Nots"} ownerId={this.state.openPerson}
				 closeDialog={this.closeDialog} elemList={[{"suggestions": this.state.dialog, "type": "textSuggest"}]}
				  placeHolder={"Choose a Person"} text={this.diText} btnName={"Close"} btnAction={this.closeDialog} showCancel={false}/>
			):(null)
			}
			</div>
		);
	}
}