import { connect } from "react-redux";
import Sidebar from "../components/Sidebar/Sidebar";

const mapStateToProps = (state) => {
	return {
		groups: state.groupList,
	};
};

const SidebarContainer = connect(mapStateToProps)(Sidebar);

export default SidebarContainer;
