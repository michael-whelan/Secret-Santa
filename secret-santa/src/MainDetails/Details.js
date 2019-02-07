import React, { Component } from "react";
import "../App.css";

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

	render() {
		var people =[];
		var group = this.state.groups[this.props.activeGroupId];
		for(var k in group){
			if(k !="name"){
				people.push(<li key={k}>{group[k].name}</li>);
			}
		}
		
		return (
			<div className="Details">
			{this.props.activeGroupId!="null" ? (
				<>
				<h1>{group.name}</h1>
				<ul>
				{people}
				</ul>
				</>
			):(
				<p> Nothing to see here</p>
			)}
			</div>
		);
	}
}