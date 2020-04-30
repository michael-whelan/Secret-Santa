import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import ActiveGroup from "../components/ActiveGroup/ActiveGroup";
import { withRouter } from "react-router-dom";

const ActiveGroupContainer = () => {
	const selectedGroup = useSelector((state) => state.sidebar.selectedGroup);
	const people = useSelector((state) => state.activeGroup.people);
	const errorMsg = useSelector((state) => state.activeGroup.errorMsg);

	return (
		<ActiveGroup
			groupDetails={selectedGroup}
			people={people}
			errorMsg={errorMsg}
		/>
	);
	// return {
	// 	groupDetails: state.sidebar.selectedGroup,
	// 	people: state.activeGroup.people,
	// 	errorMsg: state.activeGroup.errorMsg,
	// };
};

//const ActiveGroupContainer = connect(mapStateToProps)(ActiveGroup);

export default withRouter(ActiveGroupContainer);
