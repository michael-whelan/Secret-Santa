import { connect } from "react-redux";
import ActiveGroup from "../components/ActiveGroup/ActiveGroup";

const mapStateToProps = (state) => {
	return {
		group: state.sidebar.selectedGroup,
	};
};

// const mapDispatchToProps = {
// 	selectGroup,
// };
const ActiveGroupContainer = connect(mapStateToProps)(ActiveGroup);

export { ActiveGroupContainer };
