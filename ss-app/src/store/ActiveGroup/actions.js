import {
	LOAD_GROUP_ERROR,
	STORE_SELECTED_GROUP,
	FETCH_GROUP,
	CLEAR_SELECTED_GROUP,
} from "./types";
import { do_get } from "../api/actions";

const endpoint = "http://localhost:8080/";

const loadGroupError = (message) => ({
	type: LOAD_GROUP_ERROR,
	data: message,
});

const storeSelectedGroup = (data) => ({
	type: STORE_SELECTED_GROUP,
	people: data,
});

export const clearSelectedGroup = () => ({
	type: CLEAR_SELECTED_GROUP,
});

export const loadSelectedGroup = (id) => async (dispatch) => {
	let response = await do_get(endpoint + "getgroup?id=" + id);
	if (response.status === 200) {
		dispatch(storeSelectedGroup(response.data));
	} else {
		dispatch(loadGroupError(response));
	}
	return {
		type: FETCH_GROUP,
	};
};
