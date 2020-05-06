import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar/Sidebar";
import {loadSelectedGroup} from "../store/ActiveGroup/actions";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router";

const SidebarContainer = () => {
	const groupList = useSelector((state) => state.sidebar.groupList);
	const user = useSelector((state) => state.auth.user);
	const errorMsg = useSelector((state) => state.sidebar.errorMsg);
	const dispatch = useDispatch();

	const history = useHistory();

	const handleSelect = (group) => {
		history.push(`/group/${group.group_url_id}`);
	};
	console.log("add user check Sidebar container")
	return user ? (
		<Sidebar
			selectGroup={(group) => {
				dispatch(loadSelectedGroup(group.group_url_id,user.sub));
				handleSelect(group);
			}}
			groups={groupList}
			errorMsg={errorMsg}
		/>
	) : (
		<></>
	);
};

export default withRouter(SidebarContainer);
