import React, { Component } from "react";
//import { Button, fieldset, FormControl, label } from "react-bootstrap";
import "./Login.css";
import axios from 'axios';

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
		
		var config = {
			headers: {'X-User-Name': this.state.email,
			'X-User-Pass': this.state.password,
			'Access-Control-Allow-Origin': '*'}
		};
		axios.get('http://localhost:8080/login', config)
		.then(res => {
			if(res.status == 200){
				const userState = this.props.user;
				userState.user = {"uuid":res.data.uuid,"email":this.state.email};
				this.props.stateUpdate("home");
			}
		});
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