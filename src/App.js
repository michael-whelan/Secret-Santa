import React from "react";
import { Route, Switch } from "react-router-dom";
import Callback from "./containers/Callback";
import MainView from "./components/MainView/MainView"

import "./App.css";

const App = () => {
	return (
			<Switch>
			<Route exact path="/login" />
			<Route
				path="/"
				component={MainView}
			/>
			<Route exact path="/callback" component={Callback} />
			</Switch>
	);
};
export default App;
