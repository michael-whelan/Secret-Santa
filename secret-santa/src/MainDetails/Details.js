import React, { Component } from "react";
import "../App.css";
import Button from '@material-ui/core/Button';

export default class GroupDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {groups: this.props.groups};
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
	}

	showAlert = (msg) =>{
		alert(msg);
	}

	render() {
		var people =[];
		var group = this.state.groups[this.props.activeGroupId];
		for(var k in group){
			if(k !="name"){
				var person = <div className="person">
					<Button variant="outlined" color="primary"
					onClick={this.showAlert.bind(this,"Are you sure you want to delete: "+group[k].name)}>-</Button>
					<input type="text" key="name" defaultValue={group[k].name}/>
					<input type="text" key="email" defaultValue={group[k].email}/>
					<Button variant="outlined" color="primary"
					onClick={this.showAlert.bind(this,"You are adding a not field")}>Nots</Button>
				 </div>
				people.push(person);
			}
		}

		return (
			<div className="Details">
			{this.props.activeGroupId!="null" ? (
				<>
				<h1>{group.name}</h1>
				{people}
				</>
			):(
				<p> Nothing to see here</p>
			)}
			</div>
		);
	}
}