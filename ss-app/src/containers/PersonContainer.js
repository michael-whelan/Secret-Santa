import React from "react";
import Person from "../components/Person/Person";

const PersonContainer = ({ person, clickAction,disabled }) => {
	return (
		<Person
			name={person.name}
			editAction={clickAction}
			disabled={disabled}
		></Person>
	);
};

export default PersonContainer;
