import { connect } from "react-redux";
import Sidebar from "../components/Sidebar/Sidebar";
import { selectGroup } from "../store/Sidebar/actions";

const mapStateToProps = (state) => {
	return {
		groups: state.sidebar.groupList,
	};
};

const mapDispatchToProps = (dispatch) => {
	console.log("map disp", typeof selectGroup);
	return {
		selectGroup: () => dispatch(selectGroup),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
