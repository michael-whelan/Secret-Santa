import React, { Component } from "react";
//import { Button, fieldset, FormControl, label } from "react-bootstrap";
import "./Login.css";
import axios from 'axios';
import Button from '@material-ui/core/Button';

export default class Login extends Component {
	constructor(props) {
	super(props);

		this.state = {
			email: "",
			password: "",
			formType:"login"
		};
	}

	validateForm() {
		if(this.state.formType ==="login"){
			return this.state.email.length > 0 && this.state.password.length > 0;
		}
		else{
			return (this.state.email.length > 0 && this.state.password.length > 0 &&
				this.state.password === this.state.password2 &&
				this.state.first.length > 0 && this.state.last.length > 0);
		}
	}

	handleSwap = event => {
		console.log(this.state);
		this.setState({formType:event.target.value});
	}

	handleChange = event => {
		this.setState({
			[event.target.title]: event.target.value
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.user !== this.state.user) {
			this.setState({ user: nextProps.user });
		}
	}


	handleReg = event => {
	event.preventDefault();

	var config = {
		headers: {
			'Access-Control-Allow-Origin': '*'}
	};
	var data = {
		'X-User-First': this.state.first,
		'X-User-Last': this.state.last,
		'X-User-Email': this.state.email,
		'X-User-Pass': this.state.password
	};
	axios.post('http://localhost:8080/register',data, config)
	.then(res => {
		if(res.status === 200){
			//const userState = this.props.user;
			this.props.doLogin({"uuid":res.data.uuid,"email":this.state.email});
			//this.props.user = {"uuid":res.data.uuid,"email":this.state.email};
			//this.props.stateUpdate("home");
		}
		else if(res.status === 201){
			console.log(res.data,201);
		}
	});
}



	render() {
	return (
		<div className="Login">
		{this.state.formType==="login" ? (
		<form onSubmit={this.props.doLogin}>
			<h3>Sign in</h3>
			<input title="email" placeholder="enter you username" type="email"
				onChange={this.handleChange}/>
			<input type="password" title="password" placeholder="enter password"
			onChange={this.handleChange}/>
			<Button type="submit" value="Login" disabled={!this.validateForm()} color="primary">
				Login
			</Button>
			<Button value="register" onClick={this.handleSwap} color="primary">
				Register
			</Button>
		</form>
		):(
		<form onSubmit={this.handleReg}>
			<h3>Create Account</h3>
			<input title="first" placeholder="first name" type="first"
				onChange={this.handleChange}/>
			<input title="last" placeholder="last name" type="last"
				onChange={this.handleChange}/>
			<input title="email" placeholder="enter you email" type="email"
				onChange={this.handleChange}/>
			<input type="password" title="password" placeholder="enter password"
				 onChange={this.handleChange}/>
			<input type="password" title="password2" placeholder="re-enter password"
				 onChange={this.handleChange}/>
			<Button type="submit" value="register" disabled={!this.validateForm()} color="primary">
				Register
			</Button>
			<Button value="login" onClick={this.handleSwap} color="primary">
				Go Login
			</Button>
		</form>
		)}
		</div>
	);
	}
}