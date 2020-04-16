import { RENDER_GROUP_LIST } from "./actions";
import { USER_PROFILE_LOADED } from "./actions";

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
		default:
			return state;
	}
}
