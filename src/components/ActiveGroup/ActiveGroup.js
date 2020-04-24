import React from "react";
import "./ActiveGroup.css";
import ListGroup from "react-bootstrap/ListGroup";
import PersonContainer from "../../containers/PersonContainer";
import ModalContainer from "../../containers/ModalContainer";

const ActiveGroup = ({ groupDetails = {}, people = [] }) => {
	const [modalShow, setModalShow] = React.useState(false);
	const logStuff = (p) => {
		console.log("log at the top");
		setModalShow(!modalShow);
	};
	return (
		<div className="main-area">
			<ModalContainer
				show={modalShow}
				onHide={() => setModalShow(false)}
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
							clickAction={logStuff}
						/>
					))}
				</ListGroup>
			</div>
		</div>
	);
};

export default ActiveGroup;
