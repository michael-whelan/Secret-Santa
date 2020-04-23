import React from "react";
import Person from "../components/Person/Person";

const PersonContainer = (person) => {
	const editCLick = (name) => {
		console.log(name);
	};
	return <Person name={person.name} editAction={editCLick}></Person>;
};

export default PersonContainer;
