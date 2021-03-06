import axios from "axios";

import { GET_ERROR, POST_ERROR, PUT_ERROR, DELETE_ERROR } from "./types";

//const dom = "http://localhost:8080/";
const dom = "https://michaelwhelan.pythonanywhere.com/";


const getError = (message) => ({
	type: GET_ERROR,
	data: message,
});

const postError = (message) => ({
	type: POST_ERROR,
	data: message,
});

const putError = (message) => ({
	type: PUT_ERROR,
	data: message,
});

const deleteError = (message) => ({
	type: DELETE_ERROR,
	data: message,
});

export const do_post = (endpoint, vars) => {
	return axios.post(dom + endpoint, vars).then((response) => {
		return response;
	});
	// .catch((error) => {
	// 	dispatch(postError(error));
	// });
};
export const do_put = (endpoint, vars) => {
	return axios.put(dom + endpoint, vars).then((response) => {
		return response;
	});
	// .catch((error) => {
	// 	dispatch(putError(error));
	// });
};

export const do_delete = (endpoint, uuid) => {
	return axios
		.delete(dom + endpoint, { params: { uuid: uuid } })
		.then((response) => {
			return response;
		});
	// .catch((error) => {
	// 	dispatch(deleteError(error));
	// });
};
export const do_get = (endpoint, param) => {
	return axios
		.get(dom + endpoint, { params: param })
		.then((response) => {
			return response;
		});
	// .catch((error) => {
	// 	dispatch(deleteError(error));
	// });
};
