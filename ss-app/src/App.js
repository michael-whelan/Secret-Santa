import React, { Component } from "react";
import { Route } from "react-router-dom";
import Callback from "./containers/Callback";
import SidebarContainer from "./containers/SidebarContainer";
import "./App.css";

class App extends Component {
	render() {
		return (
			<div>
				<Route exact path="/login" />
				<Route
					exact
					path="/"
					render={(props) => (
						<div className="main">
							<SidebarContainer />
						</div>
					)}
				/>
				<Route exact path="/callback" component={Callback} />
			</div>
		);
	}
}

export default App;
