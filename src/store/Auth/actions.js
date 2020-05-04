import { USER_PROFILE_LOADED, HANDLE_AUTHENTICATION_CALLBACK } from "./types";

export const storeUser = (user) => {
	console.log("storeUser")
	return { type: USER_PROFILE_LOADED, data: user };
};
