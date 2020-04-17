import { RENDER_GROUP_LIST } from "./actions";
import { USER_PROFILE_LOADED } from "./actions";
import { SELECT_GROUP } from "./actions";

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
            console.log("Group Selected");
            return state;
		default:
			return state;
	}
}
