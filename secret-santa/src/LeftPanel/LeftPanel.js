import React, { Component } from "react";
import "../App.css";

export default class LeftPanel extends Component {
	constructor(props) {
		super(props);
	}

	handleChange = event => {
		this.setState({
			[event.target.type]: event.target.value
		});
	}

	handleLogout = event => {
		event.preventDefault();
	}

	render() {
		return (
			<div>
			<div className="left-panel">
				<button className="btn1" onClick={this.setAppState}>Create Group</button>
				<ul>
					<li>Item 1</li>
					<li>Item 2</li>
					<li>Item 3</li>
					<li>Item 4</li>
					<li>Item 5</li>
				</ul>
			</div>
			<div className="right"></div>
			</div>
		);
	}
}