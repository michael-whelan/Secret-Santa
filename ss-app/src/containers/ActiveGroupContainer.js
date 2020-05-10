import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActiveGroup from "../components/ActiveGroup/ActiveGroup";
import { withRouter, useRouteMatch } from "react-router-dom";
import {loadSelectedGroup} from "../store/ActiveGroup/actions"

const ActiveGroupContainer = () => {
	const selectedGroup = useSelector((state) => state.activeGroup);
	const user = useSelector((state) => state.auth.user);
	const people = useSelector((state) => state.activeGroup.people);
	const errorMsg = useSelector((state) => state.activeGroup.errorMsg);
	const dispatch = useDispatch();
	const {
		params: { ugid },
	} = useRouteMatch("/groups/:ugid");
	
	useEffect(() => {
		ugid &&
		(!selectedGroup.ugid|| selectedGroup.ugid !== ugid) &&
		(user ? dispatch(loadSelectedGroup(ugid,user.sub)):dispatch(loadSelectedGroup(ugid)))
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
