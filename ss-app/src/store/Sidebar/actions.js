import {
	SELECT_GROUP,
	LOAD_GROUP_LIST,
	RENDER_GROUP_LIST,
	LOAD_GROUP_LIST_ERROR,
} from "./types";
import axios from "axios";

const endpoint = "http://localhost:8080/";

export const selectGroup = (data) => {
	return {
		type: SELECT_GROUP,
		data: data,
	};
};

export const renderGroupList = (data) => ({
	type: RENDER_GROUP_LIST,
	groupList: data,
});

const loadGroupsError = (message) => ({
	type: LOAD_GROUP_LIST_ERROR,
	data: message,
});

const loadGroups = (message) => ({
	type: LOAD_GROUP_LIST,
});


export const loadGroupList = () => {
	
	return function (dispatch) {
		dispatch(loadGroups);
		return axios
			.get(endpoint + "getgroups")
			.then(({ data }) => {
				dispatch(renderGroupList(data));
			})
			.catch((error) => dispatch(loadGroupsError(error)));
	};
};
