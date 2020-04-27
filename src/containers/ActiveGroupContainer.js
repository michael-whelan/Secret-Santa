import { connect } from "react-redux";
import ActiveGroup from "../components/ActiveGroup/ActiveGroup";
import { doTestExport } from "../store/Modal/actions";

const mapStateToProps = (state) => {
	return {
		groupDetails: state.sidebar.selectedGroup,
		people: state.activeGroup.people,
		errorMsg: state.activeGroup.errorMsg,
	};
};

const ActiveGroupContainer = connect(mapStateToProps)(ActiveGroup);

export { ActiveGroupContainer };
