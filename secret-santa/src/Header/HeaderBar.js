import React, { Component } from "react";
import "../App.css";

export default class HeaderBar extends Component {
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
	console.log("Logout");
  }

  render() {
	return (
		<div className="header">
			<div className="left-head">
				<input type="text"/>
				<button className="btn1" onClick={this.setAppState}>Search</button>
			</div>
			<div className="right-head"> 
				<button onClick={this.handleLogout}>Logout</button>
			</div>
		</div>
	);
  }
}