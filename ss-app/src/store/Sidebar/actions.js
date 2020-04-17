export const LOAD_GROUP_LIST = "LOAD_GROUP_LIST";
export const RENDER_GROUP_LIST = "RENDER_GROUP_LIST";
export const USER_PROFILE_LOADED = "USER_PROFILE_LOADED";
export const HANDLE_AUTHENTICATION_CALLBACK = "HANDLE_AUTHENTICATION_CALLBACK";
export const SELECT_GROUP = "SELECT_GROUP";

export const loadGroupList = () => ({
	type: LOAD_GROUP_LIST,
});

export const handleAuthenticationCallback = () => ({
	type: HANDLE_AUTHENTICATION_CALLBACK,
});

export const selectGroup = () => ({
	type: SELECT_GROUP,
});
