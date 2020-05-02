import React from "react";
import { Switch, Route } from "react-router-dom";
import SidebarContainer from "../../containers/SidebarContainer";
import ActiveGroupContainer from "../../containers/ActiveGroupContainer";

const MainView = () => {
	
	return (
		<div className="main">
			<SidebarContainer />
			<Switch>
				<Route exact path={"/group/:group_url_id"}>
					<ActiveGroupContainer />
				</Route>
			</Switch>
		</div>
	);
};

export default MainView;
