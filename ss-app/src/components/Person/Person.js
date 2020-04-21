import React from "react";
import PropTypes from "prop-types";
import "./Person.css";
import Button from "react-bootstrap/Button";

const Person = ({ name, editAction }) => {
    const doEdit = ()=>{
        editAction(name);
    }
    
    return (
		<div className="person">
			<div className="person-name-lbl">{name}</div>
			<Button
				className="edit-person-btn"
				variant="outline-primary"
				onClick={doEdit}
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
