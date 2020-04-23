import { UPDATE_PERSON, UPDATE_PERSON_ERROR } from "./types";

import axios from "axios";

const endpoint = "http://localhost:8080/";

export const updatePersonStore = (person) => ({
	type: UPDATE_PERSON,
	data: person,
});

const updatePersonError = (message) => ({
	type: UPDATE_PERSON_ERROR,
	data: message,
});

export const updatePerson = (n_person) => {
	return function (dispatch) {
		return axios
			.get(endpoint + "/updateperson")
			.then(({ response }) => {
				if (response.status === 200) {
					dispatch(updatePersonStore(n_person));
				} else {
					console.log("Something is up!!");
					console.log(response);
				}
			})
			.catch((error) => dispatch(updatePersonError(error)));
	};
};
