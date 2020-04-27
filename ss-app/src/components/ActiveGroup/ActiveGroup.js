import React from "react";
import "./ActiveGroup.css";
import ListGroup from "react-bootstrap/ListGroup";
import PersonContainer from "../../containers/PersonContainer";
import ModalContainer from "../../containers/ModalContainer";
import Button from "react-bootstrap/Button";

import PropTypes from "prop-types";

const ActiveGroup = ({ groupDetails = {}, people = [], errorMsg = "" }) => {
	const [modalShow, setModalShow] = React.useState(false);
	const [activePerson, setActivePerson] = React.useState({});
	const [modalType, setModalType] = React.useState("update");

	return (
		<div className="main-area">
			<ModalContainer
				show={modalShow}
				onHide={() => setModalShow(false)}
				person={activePerson}
				group_id={groupDetails.id}
				modalType={modalType}
			/>
			<div className="activegroup">
				<div className="activegroup-header">
					<h2>{groupDetails.group_name}</h2>
				</div>
				<ListGroup>
					{people.map((p, index) => (
						<PersonContainer
							key={index}
							person={p}
							clickAction={() => {
								setModalShow(!modalShow);
								setModalType("update");
								setActivePerson(p);
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
							setActivePerson({});
							setModalType("add");
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
