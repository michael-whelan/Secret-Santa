import React from "react";
import { Switch, Route } from "react-router-dom";
import SidebarContainer from "../../containers/SidebarContainer";
import ActiveGroupContainer from "../../containers/ActiveGroupContainer";
import Headerbar from "../Headerbar/Headerbar";
import Profile from "../User/Profile";

const MainView = () => {
	return (
		<div className="main">
			<Headerbar />
			<SidebarContainer />
			<Switch>
				<Route path="/profile" component={Profile} />
				<Route exact path={"/group/:group_url_id"}>
					<ActiveGroupContainer />
				</Route>
			</Switch>
		</div>
	);
};

export default MainView;
