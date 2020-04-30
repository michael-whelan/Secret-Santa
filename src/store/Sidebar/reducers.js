import {
	RENDER_GROUP_LIST,
	SELECT_GROUP,
	LOAD_GROUP_LIST_ERROR,
} from "./types";

import history from "../../history";

const initialState = {
	groupList: [],
	errorMsg: "",
};

export default function sidebarReducer(state = initialState, action) {
	switch (action.type) {
		case RENDER_GROUP_LIST:
			return {
				...state,
				groupList: action.groupList,
			};
		case SELECT_GROUP:
			history.push(action.data.group_url_id);
			return {
				...state,
				selectedGroup: action.data,
			};
		case LOAD_GROUP_LIST_ERROR:
			console.log(action.data);
			return {
				...state,
				groupList: [],
				errorMsg: "Error Loading groups",
			};
		default:
			return state;
	}
}
