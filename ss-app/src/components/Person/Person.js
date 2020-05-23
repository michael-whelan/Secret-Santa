import React from "react";
import PropTypes from "prop-types";
import "./Person.css";
import Button from "react-bootstrap/Button";

const Person = ({ name, editAction,disabled }) => {
	return (
		<div className="person">
			<div className="person-name-lbl">{name}</div>
			<Button
			disabled= {disabled}
				className="edit-person-btn"
				variant="outline-primary"
				onClick={editAction}
			>
				Edit
			</Button>
		</div>
	);
};

Person.propTypes = {
	name: PropTypes.string.isRequired,
	editAction: PropTypes.func.isRequired,
};

export default Person;
