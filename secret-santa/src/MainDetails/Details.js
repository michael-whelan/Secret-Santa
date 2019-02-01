import React, { Component } from "react";
import "../App.css";

export default class GroupDetails extends Component {
	constructor(props) {
		super(props);
		
		//this.createList()
	}

	handleChange = event => {
		this.setState({
			[event.target.type]: event.target.value
		});
	}

	createList = () =>{

	}
	render() {
		return (
			<div className="Details">
			</div>
		);
	}
}