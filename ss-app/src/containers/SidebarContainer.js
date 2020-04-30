import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar/Sidebar";
import { selectGroup } from "../store/Sidebar/actions";
import { withRouter } from "react-router-dom";

const SidebarContainer = () => {
	const groupList = useSelector((state) => state.sidebar.groupList);
	const errorMsg = useSelector((state) => state.sidebar.errorMsg);
	const dispatch = useDispatch();

	return (
		<Sidebar
			selectGroup={(group) => dispatch(selectGroup(group))}
			groups={groupList}
			errorMsg={errorMsg}
		/>
	);
};

export default withRouter(SidebarContainer);
