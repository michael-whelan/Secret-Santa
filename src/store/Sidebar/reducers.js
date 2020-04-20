import {
	RENDER_GROUP,
	RENDER_GROUP_LIST,
	SELECT_GROUP,
	USER_PROFILE_LOADED,
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
		case USER_PROFILE_LOADED:
			return {
				...state,
				user: action.user,
			};
		case SELECT_GROUP:
			return {
				...state,
				selectedGroup: action.data,
			};
		case RENDER_GROUP:
			console.log(action);
			return state;
		default:
			return state;
	}
}
