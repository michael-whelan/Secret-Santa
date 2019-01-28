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
		this.appStates = makeEnum(["home","login","reg"]);
		this.appState = this.appStates.home;
	}
	setAppState(newState){
		console.log(newState);
		this.appState = newState;
		console.log(this.appState);		
	}
	render() {
		if(this.appState === this.appStates.home){
			return (
				<div className="App">
					<header className="App-header">
						<input type="text"/>
						<button onClick={this.setAppState(this.appStates.login)}>Go to Login</button>
					</header>
				</div>
			);
		}
		else{
			return (
				<div className="App">
					<header className="App-header">
						<Login></Login> 
					</header>
				</div>
			);
		}
	}
}

export default App;
