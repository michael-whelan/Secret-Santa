import React from "react";
import "./ActiveGroup.css";
import ListGroup from "react-bootstrap/ListGroup";
import PersonContainer from "../../containers/PersonContainer";
import ModalContainer from "../../containers/ModalContainer";
import Button from "react-bootstrap/Button";
import logo from "../../icons/icons8-edit-file-52.png";
import PropTypes from "prop-types";

const ActiveGroup = ({ groupDetails = {}, people = [], errorMsg = "" }) => {
	const [modalShow, setModalShow] = React.useState(false);
	const [activeObject, setActiveObject] = React.useState({});
	const [modalType, setModalType] = React.useState("update");
	const [modalHeading, setModalHeading] = React.useState("update");
	return (
		<div className="main-area">
			{modalShow && (
				<ModalContainer
					show={modalShow}
					onHide={() => setModalShow(false)}
					currData={Object.assign({}, activeObject)}
					ugid={groupDetails.ugid}
					modalType={modalType}
					heading={modalHeading}
					animation={false}
					people={people}
				/>
			)}
			<div className="activegroup">
				<div
					className="activegroup-header"
					onClick={() => {
						setModalType("update-group");
						setModalShow(!modalShow);
						setModalHeading("Edit Group");
						setActiveObject(groupDetails);
					}}
				>
					<h2 className="group-title">{groupDetails.group_name}</h2>
					<img alt="" className="group-edit" src={logo} />
				</div>
				<ListGroup>
					{people.map((p, index) => (
						<PersonContainer
							key={index}
							person={p}
							clickAction={() => {
								setModalShow(!modalShow);
								setModalType("update");
								setActiveObject(p);
								setModalHeading("Edit Person");
							}}
						/>
					))}
				</ListGroup>
				{groupDetails.group_name && (
					<Button
						variant="outline-primary"
						className="add-person-btn"
						onClick={() => {
							setModalShow(!modalShow);
							setActiveObject({});
							setModalType("add");
							setModalHeading("Add New Person");
						}}
					>
						Add Person
					</Button>
				)}
				<span className="error">{errorMsg}</span>
			</div>
		</div>
	);
};

ActiveGroup.propTypes = {
	groupDetails: PropTypes.object,
	people: PropTypes.array,
	errorMsg: PropTypes.string,
};

export default ActiveGroup;
