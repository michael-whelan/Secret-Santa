import React, { Component } from "react";
import "../App.css";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
		this.props.doLogout();
		//Check if current page needs creds
		//If so return to login
		//if not stay on page
	}

	render() {
	return (
		<div className="header">
			<div className="left-head">
				<TextField id="header-search-bar" label="Search" margin="none" className="search-input"/>
				<Button  className="btn1" onClick={this.setAppState} variant="contained" color="primary">
					Search</Button>
			</div>
			{this.props.user!=="null" ? (
				<div className="right-head">
					<label className="user-name">{this.props.user.email}</label>
					<button onClick={this.handleLogout}>Logout</button>
				</div>
			) : (
				<div className="right-head">
					<Button value="login"  onClick={this.props.goLogin} variant="contained" color="primary">
						Login
					</Button>
				</div>
			)}
		</div>
	);
	}
}