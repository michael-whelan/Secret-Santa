import React, { useState } from "react";
import "./Sidebar.css";
import ListGroup from "react-bootstrap/ListGroup";
import ListItem from "../ListItem/ListItem";

const SideBar = ({ groups, selectGroup }) => {
	const [sgroup, setGroup] = useState({});

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
						setGroup={(group) => setGroup(group)}
						selectGroup={(group) => selectGroup(group)}
					/>
				))}
			</ListGroup>
		</div>
	);
};

export default SideBar;
