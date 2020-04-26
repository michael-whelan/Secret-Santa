import React from "react";
import "./ActiveGroup.css";
import ListGroup from "react-bootstrap/ListGroup";
import PersonContainer from "../../containers/PersonContainer";
import ModalContainer from "../../containers/ModalContainer";
import Button from "react-bootstrap/Button";

import PropTypes from "prop-types";

const ActiveGroup = ({
	groupDetails = {},
	people = [],
	errorMsg = "",
	doUpdate,
	doAddPerson,
}) => {
	const [modalShow, setModalShow] = React.useState(false);
	const [modalMap, setModalMap] = React.useState([]);
	const [modalType, setModalType] = React.useState("edit");
	const [modalSubButton, setModalSubButton] = React.useState("Update");
	const [activePerson, setActivePerson] = React.useState({});

	const modalSubmit = (val) => {
		modalType === "edit" ? doUpdate(val) : doAddPerson(val, groupDetails.id);
	};
	const personMap = [
		{
			label: "Name",
			type: "text",
			default: "Username",
			link: "name",
		},
		{
			label: "email",
			type: "text",
			default: "email",
			link: "email",
		},
	];
	return (
		<div className="main-area">
			<ModalContainer
				show={modalShow}
				onHide={() => setModalShow(false)}
				modalMap={modalMap}
				person={activePerson}
				submitTitle={modalSubButton}
				doSubmit={modalSubmit}
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
								setActivePerson(p);
								setModalMap(personMap);
								setModalType("edit");
								setModalSubButton("Update");
							}}
						/>
					))}
				</ListGroup>
				{groupDetails.group_name && (
					<Button
						variant="outline-primary"
						className="add-person-btn"
						onClick={() => {
							setModalMap(personMap);
							setModalType("add");
							setModalSubButton("Add");
							setModalShow(!modalShow);
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
