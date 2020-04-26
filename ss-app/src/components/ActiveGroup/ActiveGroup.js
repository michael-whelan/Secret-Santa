import React from "react";
import "./ActiveGroup.css";
import ListGroup from "react-bootstrap/ListGroup";
import PersonContainer from "../../containers/PersonContainer";
import ModalContainer from "../../containers/ModalContainer";
import PropTypes from "prop-types";

const ActiveGroup = ({ groupDetails = {}, people = [], errorMsg = "" }) => {
	const [modalShow, setModalShow] = React.useState(false);
	const [activePerson, setActivePerson] = React.useState({});

	const modalMap = [
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
							}}
						/>
					))}
				</ListGroup>
				<span className="error">{errorMsg}</span>
			</div>
		</div>
	);
};

ActiveGroup.propTypes = {
	groupDetails: PropTypes.object,
	people: PropTypes.array,
};

export default ActiveGroup;
