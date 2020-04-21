import { connect } from "react-redux";
import React from "react";
import Button from "react-bootstrap/Button";
import Person from "../components/Person/Person";

const PersonContainer = (person) => {
	const editCLick = (name) => {
		console.log(name);
	};
	return <Person name={person.name} editAction={editCLick}></Person>;
};

export default PersonContainer;
