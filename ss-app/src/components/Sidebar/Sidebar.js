import React from "react";
import "./Sidebar.css";
import ListGroup from "react-bootstrap/ListGroup";
import ListItem from "../ListItem/ListItem";

const SideBar = ({ groups, selectGroup }) => {
	return (
		<div className="sidebar">
			<div className="sidebar-header">
				<h3>Sidebar Header</h3>
			</div>

			<ListGroup>
				{groups.map((groups, index) => (
					<ListItem key={index} {...groups} selectGroup={selectGroup}/>
				))}
			</ListGroup>
		</div>
	);
};

export default SideBar;
