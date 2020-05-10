import React from "react";
import { Switch, Route } from "react-router-dom";
import SidebarContainer from "../../containers/SidebarContainer";
import ActiveGroupContainer from "../../containers/ActiveGroupContainer";
import Headerbar from "../Headerbar/Headerbar";
import Profile from "../User/Profile";
import Home from "../Home/Home";

const MainView = () => {
	return (
		<div className="main">
			<Headerbar />
			<Switch>
				<Route path="/profile" component={Profile} />
				<Route exact path="/" component={Home} />
				<Route path={"/groups"}>
					<SidebarContainer />
					<Route exact path={"/groups/:group_url_id"}>
						<ActiveGroupContainer />
					</Route>
				</Route>
			</Switch>
		</div>
	);
};

export default MainView;
