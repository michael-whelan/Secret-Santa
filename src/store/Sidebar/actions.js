import {
	USER_PROFILE_LOADED,
	HANDLE_AUTHENTICATION_CALLBACK,
	SELECT_GROUP,
} from "./types";

import { loadGroup } from "../sagas/actions";

export const handleAuthenticationCallback = () => ({
	type: HANDLE_AUTHENTICATION_CALLBACK,
});

export const selectGroup = (data)  => {
	//dispatch(loadGroup(data));
	return {
		type: SELECT_GROUP,
		data: data,
	};
};
