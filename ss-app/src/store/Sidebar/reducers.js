import {
	RENDER_GROUP_LIST,
	SELECT_GROUP,
	LOAD_GROUP_LIST_ERROR,
	CLEAR_SELECTED_GROUP,
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
		case SELECT_GROUP:
			let group = state.groupList.find(
				g=> g.group_url_id === action.data
			);
			return {
				...state,
				selectedGroup: group,
			};
		case CLEAR_SELECTED_GROUP:
			return {
				...state,
				selectedGroup: {}
			}
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
