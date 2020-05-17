import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar/Sidebar";
import { loadSelectedGroup } from "../store/ActiveGroup/actions";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router";
import hamburgerLogo from "../icons/icons8-hamburger.png";
import "./styles.css";

const SidebarContainer = () => {
	const groupList = useSelector((state) => state.sidebar.groupList);
	const user = useSelector((state) => state.auth.user);
	const errorMsg = useSelector((state) => state.sidebar.errorMsg);
	const [sidebarShow, setSidebarShow] = useState(false);

	const dispatch = useDispatch();

	const history = useHistory();

	const handleSelect = (group) => {
		history.push(`/groups/${group.group_url_id}`);
	};
	return user ? (
		<div>
			<img
				className="hamburger"
				alt="hamburger-menu"
				src={hamburgerLogo}
				onClick={() => {
					setSidebarShow(!sidebarShow);
				}}
			/>

			<Sidebar
				selectGroup={(group) => {
					dispatch(loadSelectedGroup(group.group_url_id, user.sub));
					handleSelect(group);
					setSidebarShow(!sidebarShow);
				}}
				showSidebar={sidebarShow ? "show" : "hidden"}
				groups={groupList}
				errorMsg={errorMsg}
				user = {user}
			/>
		</div>
	) : (
		<></>
	);
};

export default withRouter(SidebarContainer);
