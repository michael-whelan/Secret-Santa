import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar/Sidebar";
import { loadSelectedGroup } from "../store/ActiveGroup/actions";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router";
import hamburgerLogo from "../icons/icons8-hamburger.png";

const hamburgerStyle = {
	display: "inline-block",
	width: "10%",
	position: "absolute",
	marginRight: "5%",
	left: "2%",
	zIndex: 3,
	top: "1%",
};
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
				style={hamburgerStyle}
				onClick={() => setSidebarShow(!sidebarShow)}
			/>
			{sidebarShow && (
				<Sidebar
					selectGroup={(group) => {
						dispatch(
							loadSelectedGroup(group.group_url_id, user.sub)
						);
						handleSelect(group);
					}}
					groups={groupList}
					errorMsg={errorMsg}
				/>
			)}
		</div>
	) : (
		<></>
	);
};

export default withRouter(SidebarContainer);
