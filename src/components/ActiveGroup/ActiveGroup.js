import React from "react";
import "./ActiveGroup.css";
import ListGroup from "react-bootstrap/ListGroup";
import PersonContainer from "../../containers/PersonContainer";

const ActiveGroup = ({ groupDetails = {}, people = [] }) => {
	return (
		<div className="activegroup">
			<div className="activegroup-header">
				<h2>{groupDetails.group_name}</h2>
			</div>
			<ListGroup>
				{people.map((people, index) => (
					<PersonContainer key={index} {...people}/>
				))}
			</ListGroup>
		</div>
	);
};

export default ActiveGroup;
