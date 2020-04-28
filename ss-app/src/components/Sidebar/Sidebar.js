import React from "react";
import "./Sidebar.css";
import ListGroup from "react-bootstrap/ListGroup";
import ListItem from "../ListItem/ListItem";
import Button from "react-bootstrap/Button";
import ModalContainer from "../../containers/ModalContainer";


const SideBar = ({ groups, selectGroup, errorMsg }) => {
	const [modalShow, setModalShow] = React.useState(false);
	const [activeGroup, setActiveGroup] = React.useState({});
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
			<Button
				variant="outline-primary"
				className="add-group-btn"
				onClick={() => {
					setModalShow(true)
				}}
			>
				Add Group
			</Button>
			<span className="error">{errorMsg}</span>

			<ModalContainer
				show={modalShow}
				onHide={() => setModalShow(false)}
				group_id={null}
				currData={activeGroup}
				heading={"Add New Group"}
				modalType={"add-group"}
			/>
		</div>
	);
};

export default SideBar;