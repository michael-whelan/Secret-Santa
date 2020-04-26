import { connect } from "react-redux";
import ActiveGroup from "../components/ActiveGroup/ActiveGroup";
import { updatePerson, addPerson, doTestExport } from "../store/Modal/actions";

const mapStateToProps = (state) => {
	return {
		groupDetails: state.sidebar.selectedGroup,
		people: state.activeGroup.people,
		errorMsg: state.activeGroup.errorMsg,
	};
};

const mapDispatchToProps = {
	doUpdate: updatePerson,
	doAddPerson: addPerson,
};
const ActiveGroupContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ActiveGroup);

export { ActiveGroupContainer };
