import {
	SELECT_GROUP,
	LOAD_GROUP_LIST,
	RENDER_GROUP_LIST,
	LOAD_GROUP_LIST_ERROR,
} from "./types";

import { loadSelectedGroup } from "../ActiveGroup/actions";

import axios from "axios";

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

const loadGroups = (message) => ({
	type: LOAD_GROUP_LIST,
});

export const loadGroupList = () => {
	return function (dispatch) {
		dispatch(loadGroups());
		return axios
			.get(endpoint + "getgroups")
			.then(({ data }) => {
				dispatch(renderGroupList(data));
			})
			.catch((error) => dispatch(loadGroupsError(error)));
	};
};
