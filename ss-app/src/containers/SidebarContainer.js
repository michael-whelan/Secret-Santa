import { connect } from "react-redux";
import Sidebar from "../components/Sidebar/Sidebar";
import { selectGroup } from "../store/Sidebar/actions";

const mapStateToProps = ({sidebar}) => {
	return {
		groups: sidebar.groupList,
		errorMsg: sidebar.errorMsg,
	};
};

const mapDispatchToProps = {
	selectGroup,
};
const SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(Sidebar);

export { SidebarContainer };
