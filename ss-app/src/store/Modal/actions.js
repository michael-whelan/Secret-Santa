import {
	UPDATE_PERSON,
	UPDATE_PERSON_ERROR,
	ADD_PERSON,
	DELETE_PERSON,
} from "./types";
import { loadSelectedGroup } from "../ActiveGroup/actions";

import axios from "axios";

const endpoint = "http://localhost:8080/";

const updatePersonStore = (person) => ({
	type: UPDATE_PERSON,
	data: person,
});

const addedPerson = () => ({
	type: ADD_PERSON,
});

const deletedPerson = () => ({
	type: DELETE_PERSON,
});

const updatePersonError = (message) => ({
	type: UPDATE_PERSON_ERROR,
	data: message,
});

export const doTestExport = (n_person, group_id) => ({
	type: "DO_TEST",
	data: { n_person, group_id },
});

export const updatePerson = (n_person) => {
	const { name, email, person_id } = n_person;
	return function (dispatch) {
		return axios
			.put(endpoint + "updateperson", { name, email, person_id })
			.then((response) => {
				if (response.status === 200) {
					dispatch(updatePersonStore(n_person));
				} else {
					dispatch(updatePersonError(response));
				}
			})
			.catch((error) => {
				dispatch(updatePersonError(error));
			});
	};
};

export const addPerson = ({ name, email }, group_id) => {
	return function (dispatch) {
		return axios
			.post(endpoint + "addperson", { name, email, group_id })
			.then((response) => {
				if (response.status === 200) {
					dispatch(addedPerson());
					dispatch(loadSelectedGroup(group_id));
				} else {
					dispatch(updatePersonError(response));
				}
			})
			.catch((error) => {
				dispatch(updatePersonError(error));
			});
	};
};

export const deletePerson = ({ person_id }, group_id) => {
	console.log(person_id);
	return function (dispatch) {
		return axios
			.delete(endpoint + "deleteperson?id="+person_id)
			.then((response) => {
				if (response.status === 200) {
					dispatch(deletedPerson());
					dispatch(loadSelectedGroup(group_id));
				} else {
					dispatch(updatePersonError(response));
				}
			})
			.catch((error) => {
				dispatch(updatePersonError(error));
			});
	};
};
