import React from "react";
import "./Sidebar.css";
import ListGroup from "react-bootstrap/ListGroup";
import ListItem from "../ListItem/ListItem";

const SideBar = ({ groups, selectGroup }) => {
    console.log(groups)
	return (
		<div className="sidebar">
			<div className="sidebar-header">
				<h3>Sidebar Header</h3>
			</div>

			<ListGroup>
				{groups.map((groups, index) => (
					<ListItem key={index} group= {groups} selectGroup={selectGroup}/>
				))}
			</ListGroup>
		</div>
	);
};

export default SideBar;
