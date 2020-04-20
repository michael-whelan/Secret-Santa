import { LOAD_GROUP_LIST, LOAD_GROUP } from "./types";

export const loadGroupList = () => ({
	type: LOAD_GROUP_LIST,
});

export const loadGroup = (id) => ({
	data: id,
	type: LOAD_GROUP,
});
