export const LOAD_GROUP_LIST = "LOAD_GROUP_LIST";
export const RENDER_GROUP_LIST = "RENDER_GROUP_LIST";
export const USER_PROFILE_LOADED = "USER_PROFILE_LOADED";
export const HANDLE_AUTHENTICATION_CALLBACK = "HANDLE_AUTHENTICATION_CALLBACK";

export function loadGroupList() {
	return {
		type: LOAD_GROUP_LIST,
	};
}

export function handleAuthenticationCallback() {
	return {
		type: HANDLE_AUTHENTICATION_CALLBACK,
	};
}
