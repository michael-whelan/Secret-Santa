import {
	SELECT_GROUP,
	LOAD_GROUP_LIST,
	RENDER_GROUP_LIST,
	LOAD_GROUP_LIST_ERROR,
} from "./types";

import { loadSelectedGroup } from "../ActiveGroup/actions";
import { do_get } from "../api/actions";

const endpoint = "http://localhost:8080/";

export const selectGroup = (data) => (dispatch) => {
	dispatch(doSelectGroup(data));
	dispatch(loadSelectedGroup(data.id));
};

const doSelectGroup = (data) => {
	return {
		type: SELECT_GROUP,
		data: data,
	};
};

const renderGroupList = (data) => ({
	type: RENDER_GROUP_LIST,
	groupList: data,
});

export const loadGroupsError = (message) => ({
	type: LOAD_GROUP_LIST_ERROR,
	data: message,
});

export const loadGroupList = () => async dispatch =>{
	let response = await do_get(endpoint + "getgroups");

	if (response.status === 200) {
		dispatch(renderGroupList(response.data));
	} else {
		dispatch(loadGroupsError(response));
	}
	return {
		type: LOAD_GROUP_LIST,
	}

};