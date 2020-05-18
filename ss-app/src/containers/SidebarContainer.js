import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar/Sidebar";
import { loadSelectedGroup } from "../store/ActiveGroup/actions";
import { withRouter, useLocation } from "react-router-dom";
import { useHistory } from "react-router";
import hamburgerLogo from "../icons/icons8-hamburger.png";
import "./styles.css";

const SidebarContainer = () => {
	const groupList = useSelector((state) => state.sidebar.groupList);
	const user = useSelector((state) => state.auth.user);
	const errorMsg = useSelector((state) => state.sidebar.errorMsg);
	const [sidebarShow, setSidebarShow] = useState(false);
	let location = useLocation();
	const dispatch = useDispatch();

	const history = useHistory();

	const handleSelect = (group) => {
		history.push(`/groups/${group.group_url_id}`);
	};
	return user ? (
		<div
			className={!location.pathname.includes("groups") ? "at-home" : ""}
		>
			<img
				className="hamburger"
				alt="hamburger-menu"
				src={hamburgerLogo}
				onClick={() => {
					setSidebarShow(!sidebarShow);
				}}
			/>
			<div
				className={"main-overlay " + (sidebarShow ? "show" : "hidden")}
				onClick={() => setSidebarShow(!sidebarShow)}
			></div>
			<Sidebar
				selectGroup={(group) => {
					dispatch(loadSelectedGroup(group.group_url_id, user.sub));
					handleSelect(group);
					setSidebarShow(!sidebarShow);
				}}
				showSidebar={sidebarShow ? "show" : "hidden"}
				groups={groupList}
				errorMsg={errorMsg}
				user={user}
			/>
		</div>
	) : (
		<></>
	);
};

export default withRouter(SidebarContainer);
