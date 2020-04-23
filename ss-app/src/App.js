import React from "react";
import { Route } from "react-router-dom";
import Callback from "./containers/Callback";
import { SidebarContainer } from "./containers/SidebarContainer";
import { ActiveGroupContainer } from "./containers/ActiveGroupContainer";
import "./App.css";

function App() {
	return (
		<div>
			<Route exact path="/login" />
			<Route
				exact
				path="/"
				render={(props) => (
					<div className="main">
						<SidebarContainer />
						<ActiveGroupContainer />
					</div>
				)}
			/>
			<Route exact path="/callback" component={Callback} />
		</div>
	);
}
export default App;
