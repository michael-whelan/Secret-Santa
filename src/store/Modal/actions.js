import { UPDATE_PERSON, UPDATE_PERSON_ERROR } from "./types";

import axios from "axios";

const endpoint = "http://localhost:8080/";

const updatePersonStore = (person) => ({
	type: UPDATE_PERSON,
	data: person,
});

const updatePersonError = (message) => ({
	type: UPDATE_PERSON_ERROR,
	data: message,
});

export const updatePerson = (n_person) => {
	const { name, email, person_id } = n_person;
	return function (dispatch) {
		return axios
			.put(endpoint + "updateperson", { name, email, person_id })
			.then((response) => {
				if (response.status === 200) {
					console.log("200 response");
					dispatch(updatePersonStore(n_person));
				} else {
					console.log("Something is up!!");
					console.log(response);
					dispatch(updatePersonError("sometjing"));
				}
			})
			.catch((error) => {
				console.log("catch");
				dispatch(updatePersonError(error));
			});
	};
};
