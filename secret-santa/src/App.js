import React, { Component } from 'react';
import './App.css';
import Login from './Login/Login.js';
import HeaderBar from './Header/HeaderBar.js'


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
		this.state = {page:"home"};
	}
	setAppState = ()=> {
    	this.setState({page: "login"})
		console.log(this.state);
	}

	updateAppState = (newState)=>{
		this.setState({page: newState})
		console.log(this.state);
	}

	render() {
		const page = this.state.page;
		if(this.state.page === "landing"){
			return (
				<div className="App">
					<div className="main">
						<div className = "dialogue">
							<input type="text"/>
							<button className="btn1" onClick={this.setAppState}>Go to Login</button>
						</div>
					</div>
				</div>
			);
		}
		else if(this.state.page ==="home"){
			return (
				<div className="App">
					<HeaderBar></HeaderBar>
					<div className="main">					
						{/*<LeftPanel></LeftPanel>
						<DetailArea></DetailArea>*/}
					</div>
				</div>
			);
		}
		else{
			return (
				<div className="App">
					<div className="main">
						<Login stateUpdate={this.updateAppState}></Login>
					</div>
				</div>
			);
		}
	}
}
export default App;
