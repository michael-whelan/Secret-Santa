import axios from "axios";

//const dom = "http://localhost:8080/";
const dom = "https://michaelwhelan.pythonanywhere.com/";


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
