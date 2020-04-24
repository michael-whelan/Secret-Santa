import React from "react";
import Person from "../components/Person/Person";

const PersonContainer = ({ person, clickAction }) => {
	return (
		<Person
			name={person.name}
			editAction={() => clickAction(person)}
		></Person>
	);
};

export default PersonContainer;
