import React from "react";
import Person from "../components/Person/Person";

const PersonContainer = (person, clickAction) => {
	const editCLick = (p) => {
        console.log(p.name);
        console.log(clickAction)
		//clickAction(p);
	};
	return (
		<Person
			name={person.name}
			editAction={() => editCLick(person)}
		></Person>
	);
};

export default PersonContainer;
