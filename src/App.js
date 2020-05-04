import React from "react";
import { Route, Switch } from "react-router-dom";
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
			</Switch>
	);
};
export default App;
