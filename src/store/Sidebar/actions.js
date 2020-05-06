import {
	SELECT_GROUP,
	LOAD_GROUP_LIST,
	RENDER_GROUP_LIST,
	LOAD_GROUP_LIST_ERROR,
	CLEAR_SELECTED_GROUP,
} from "./types";

import { do_get } from "../api/actions";
import { loadSelectedGroup } from "../ActiveGroup/actions";



const renderGroupList = (data) => ({
	type: RENDER_GROUP_LIST,
	groupList: data,
});

export const loadGroupsError = (message) => ({
	type: LOAD_GROUP_LIST_ERROR,
	data: message,
});

export const loadGroupList = (userId = null) => async (dispatch) => {
	let response = await do_get("getgroups", {uuid: userId});

	if (response.status === 200) {
		dispatch(renderGroupList(response.data));
	} else {
		dispatch(loadGroupsError(response));
	}
	return {
		type: LOAD_GROUP_LIST,
	};
};
