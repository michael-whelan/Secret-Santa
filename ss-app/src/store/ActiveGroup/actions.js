import { LOAD_GROUP_ERROR, STORE_SELECTED_GROUP } from "./types";

import axios from "axios";

const endpoint = "http://localhost:8080/";

const loadGroupError = (message) => ({
	type: LOAD_GROUP_ERROR,
	data: message,
});

export const storeSelectedGroup = (data) => ({
	type: STORE_SELECTED_GROUP,
	people: data,
});

export const loadSelectedGroup = (id) => {
	return function (dispatch) {
		return axios
			.get(endpoint + "getgroup?id=" + id)
			.then(({ data }) => {
				dispatch(storeSelectedGroup(data));
			})
			.catch((error) => dispatch(loadGroupError(error)));
	};
};
