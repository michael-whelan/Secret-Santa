import { connect } from "react-redux";
import ActiveGroup from "../components/ActiveGroup/ActiveGroup";

const mapStateToProps = (state) => {
	return {
        groupDetails: state.sidebar.selectedGroup,
        people:state.activeGroup.people
	};
};

// const mapDispatchToProps = {
// 	selectGroup,
// };
const ActiveGroupContainer = connect(mapStateToProps)(ActiveGroup);

export { ActiveGroupContainer };
