import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActiveGroup from "../components/ActiveGroup/ActiveGroup";
import { withRouter, useRouteMatch } from "react-router-dom";
import { selectGroup } from "../store/Sidebar/actions";

const ActiveGroupContainer = () => {
	const selectedGroup = useSelector((state) => state.sidebar.selectedGroup);
	const user = useSelector((state) => state.auth.user);
	const people = useSelector((state) => state.activeGroup.people);
	const errorMsg = useSelector((state) => state.activeGroup.errorMsg);
	const dispatch = useDispatch();
	const {
		params: { group_url_id },
	} = useRouteMatch("/group/:group_url_id");

	useEffect(() => {
		user &&
		(!selectedGroup || selectedGroup.group_url_id !== group_url_id) &&
			dispatch(selectGroup(group_url_id));
	});

	return (
		<ActiveGroup
			groupDetails={selectedGroup}
			people={people}
			errorMsg={errorMsg}
		/>
	);
};

export default withRouter(ActiveGroupContainer);
