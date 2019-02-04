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
	//Check if current page needs creds
	//If so return to login
	//if not stay on page
  }

  render() {
	return (
		<div className="header">
			<div className="left-head">
				<input type="text"/>
				<button className="btn1" onClick={this.setAppState}>Search</button>
			</div>
			{this.props.user!="null" ? (
				<div className="right-head">
					<label className="user-name">{this.props.user}</label>
					<button onClick={this.handleLogout}>Logout</button>
				</div>
			) : (
				<div className="right-head">
					<button onClick={this.props.goLogin}>Login</button>
				</div>
			)}
		</div>
	);
  }
}