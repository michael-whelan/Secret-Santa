import {
	RENDER_GROUP_LIST,
	SELECT_GROUP,
	LOAD_GROUP_LIST_ERROR,
} from "./types";

const initialState = {
	groupList: [],
};

export default function sidebarReducer(state = initialState, action) {
	switch (action.type) {
		case RENDER_GROUP_LIST:
			return {
				...state,
				groupList: action.groupList,
			};
		case SELECT_GROUP:
			return {
				...state,
				selectedGroup: action.data,
			};
		case LOAD_GROUP_LIST_ERROR:
			console.log(action.data);
			return {
				...state,
				groupList: [],
			};
		default:
			return state;
	}
}
