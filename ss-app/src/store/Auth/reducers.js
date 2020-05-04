import { USER_PROFILE_LOADED, HANDLE_AUTHENTICATION_CALLBACK } from "./types";

const initialState = {
};

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case USER_PROFILE_LOADED:
			console.log(action.data)
			return {
				...state,
				user: action.data,
			};
		default:
			return state;
	}
}
