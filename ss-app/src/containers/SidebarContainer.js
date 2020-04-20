import { connect } from "react-redux";
import Sidebar from "../components/Sidebar/Sidebar";
import { selectGroup } from "../store/Sidebar/actions";

const mapStateToProps = (state) => {
	return {
		groups: state.sidebar.groupList,
	};
};

const mapDispatchToProps = {
	selectGroup,
};
const SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(Sidebar);

export { SidebarContainer };
