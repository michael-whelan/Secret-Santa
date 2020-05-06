import {
	RENDER_GROUP_LIST,
	LOAD_GROUP_LIST_ERROR,
} from "./types";

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
