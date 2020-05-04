import { USER_PROFILE_LOADED } from "./types";

const initialState = {
};

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case USER_PROFILE_LOADED:
			return {
				...state,
				user: action.data,
			};
		default:
			return state;
	}
}
