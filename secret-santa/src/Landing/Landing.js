import React, { Component } from "react";


export default class Landing extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: ""
		};
	}

	validateForm() {
			return this.state.email.length > 0 && this.state.password.length > 0;
	}

	handleChange = event => {
		this.setState({
		[event.target.type]: event.target.value
		});
	}

	handleSubmit = event => {
		event.preventDefault();
		console.log("test");
	}

	render() {
		return (
		<div className = "dialogue">
			<input type="text"/>
			<button className="btn1" onClick={this.setAppState}>Go to Login</button>
		</div>
		);
	}
}