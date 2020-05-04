import { USER_PROFILE_LOADED } from "./types";

export const storeUser = (user) => {
	return { type: USER_PROFILE_LOADED, data: user };
};
