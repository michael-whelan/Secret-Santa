import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login.js';


function makeEnum(arr){
    let obj = {};
    for (let val of arr){
        obj[val] = Symbol(val);
    }
    return Object.freeze(obj);
}

class App extends Component {
	constructor(props) {	
		super(props);
		//this.appStates = makeEnum(["home","login","reg"]);
		//this.appState = this.appStates.home;
		//this.state = {page:["home","login","reg"]};
		//this.setState({page:"home"});
		this.state = {page:"home"};
	}
	setAppState = ()=> {
		this.state ={page: "login"};
		console.log(this.state);
	}

	tester = () =>{
		console.log(this.state);
	}

	render() {
		const page = this.state.page;
		if(this.state.page === "home"){
			return (
				<div className="App">
					<header className="App-header">
						<input type="text"/>
						<button onClick={this.setAppState}>Go to Login</button>
						<button onClick={this.tester}>test</button>
					</header>
				</div>
			);
		}
		else{
			return (
				<div className="App">
					<header className="App-header">
						<Login></Login>
						<button onClick={this.tester}>test</button>
					</header>
				</div>
			);
		}
	}
}
/*
return (
				<div className="App">
					<header className="App-header">
					{this.state.page === "home" ? (
							<input type="text"/>
							<button onClick={this.setAppState}>Go to Login</button>
							<button onClick={this.tester}>test</button>
					): (
							<Login></Login>
							<button onClick={this.tester()}>test</button>
					)}
					</header>
				</div>
			);
*/ 
export default App;
