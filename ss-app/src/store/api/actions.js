import axios from "axios";

const postError = (message) => ({
	type: "POST_ERROR",
	data: message,
});
export const do_post = (endpoint, vars) => {
	return axios
		.post(endpoint, vars)
		.then((response) => {
			return response;
		})
		// .catch((error) => {
		// 	dispatch(postError(error));
		// });
};
export const do_put = (endpoint, vars) => {
	return axios
		.put(endpoint, vars)
		.then((response) => {
			return response;
		})
		// .catch((error) => {
		// 	dispatch(putError(error));
		// });
};

export const do_delete = (endpoint) => {
	return axios
		.delete(endpoint)
		.then((response) => {
			return response;
		})
		// .catch((error) => {
		// 	dispatch(deleteError(error));
		// });
};