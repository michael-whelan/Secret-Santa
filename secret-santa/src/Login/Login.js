import React, { Component } from "react";
//import { Button, fieldset, FormControl, label } from "react-bootstrap";
import "./Login.css";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default class Login extends Component {
	constructor(props) {
	super(props);

		this.state = {
			email: "",
			password: "",
			formType:"register"
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
		console.log(event.target);
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.user !== this.state.user) {
			this.setState({ user: nextProps.user });
		}
	}
	handleSubmit = event => {
	event.preventDefault();

		/*var config = {
			headers: {'X-User-ID': uuidCookie,
			'Access-Control-Allow-Origin': '*'}
		};*/
		console.log(this.state.password,this.state.email);
		var authOptions = {
			method: 'get',
			url: 'http://localhost:8080/login',
			headers: {'X-User-Email': this.state.email,
			'X-User-Pass': this.state.password,
			'Access-Control-Allow-Origin': '*'},
			json: true
		   };
		axios(authOptions)
		.then(res => {
			if(res.status === 200){
				document.cookie = "uuid="+ res.data.uuid+";expires=400;"
				this.props.doLogin(res.data);
			}
		});
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
			console.log(res.data);
			document.cookie = "uuid="+ res.data.uuid+";expires=400;"
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
			<form onSubmit={this.handleSubmit}>
				<h3>Sign in</h3>
				<TextField name="email" type="email" label="email" margin="none"
					onChange={this.handleChange}/>
				<TextField type="password" name="password"	label="password" margin="none"
					onChange={this.handleChange}/>
				<Button type="submit" className="main-btn" value="Login" disabled={!this.validateForm()}
					variant="contained" color="primary">
					Login
				</Button>
				<Button value="register" className="main-btn" onClick={this.handleSwap} variant="contained"
					color="primary">
					Register
				</Button>
			</form>
			):(
			<form onSubmit={this.handleReg}>
				<h3>Create Account</h3>
				<TextField name="first" type="first" label="first name" margin="none"
					onChange={this.handleChange}/>
				<TextField name="last" type="last" label="last name" margin="none"
					onChange={this.handleChange}/>
				<TextField name="email" type="email" label="email" margin="none"
					onChange={this.handleChange}/>
				<TextField name="password1" type="password" label="password" margin="none"
					onChange={this.handleChange}/>
				<TextField name="password2" type="password" label="re-password" margin="none"
					onChange={this.handleChange}/>
				<Button type="submit" value="register" className="main-btn" disabled={!this.validateForm()} color="primary">
					Register
				</Button>
				<Button value="login" onClick={this.handleSwap} className="main-btn" color="primary">
					Go Login
				</Button>
			</form>
			)}
			</div>
		);
	}
}