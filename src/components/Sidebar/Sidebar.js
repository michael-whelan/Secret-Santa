import React from "react";
import "./Sidebar.css";
import ListGroup from "react-bootstrap/ListGroup";
import ListItem from "../ListItem/ListItem";

const SideBar = ({ groups, selectGroup, errorMsg }) => {

	return (
		<div className="sidebar">
			<div className="sidebar-header">
				<h3>Group List</h3>
			</div>

			<ListGroup>
				{groups.map((group, index) => (
					<ListItem
						key={index}
						group={group}
						selectGroup={(group) => selectGroup(group)}
					/>
				))}
			</ListGroup>
			<span className="error">{errorMsg}</span>
		</div>
	);
};

export default SideBar;
