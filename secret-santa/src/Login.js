import React, { Component } from "react";
//import { Button, fieldset, FormControl, label } from "react-bootstrap";
import "./Login.css";

export default class Login extends Component {
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
	console.log(this.state.email);
  }

  render() {
	return (
	  <div className="Login">
		<form onSubmit={this.handleSubmit}>
			<h3>Sign in</h3>
			<input ref="username" placeholder="enter you username" type="email"
				onChange={this.handleChange}/>
			<input type="password" ref="password" placeholder="enter password" 
			   onChange={this.handleChange}/>
			<input type="submit" value="Login" disabled={!this.validateForm()}/>
		</form>
	  </div>
	);
  }
}