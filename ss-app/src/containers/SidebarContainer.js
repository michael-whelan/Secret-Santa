import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar/Sidebar";
import { selectGroup } from "../store/Sidebar/actions";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router";

const SidebarContainer = () => {
	const groupList = useSelector((state) => state.sidebar.groupList);
	const errorMsg = useSelector((state) => state.sidebar.errorMsg);
	const dispatch = useDispatch();

	const history = useHistory();

	const handleSelect = (group) => {
		history.push(`/group/${group.group_url_id}`);
	};
	return (
		<Sidebar
			selectGroup={(group) => {
				//dispatch(loadSelectedGroup(group.group_url_id));
				dispatch(selectGroup(group.group_url_id));
				handleSelect(group);
			}}
			groups={groupList}
			errorMsg={errorMsg}
		/>
	);
};

export default withRouter(SidebarContainer);
