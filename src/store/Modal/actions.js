import {
	UPDATE_PERSON,
	UPDATE_PERSON_ERROR,
	ADD_PERSON,
	DELETE_PERSON,
	ADD_GROUP,
	UPDATE_GROUP,
	DELETE_GROUP,
} from "./types";
import { loadSelectedGroup, clearSelectedGroup } from "../ActiveGroup/actions";
import { loadGroupList, loadGroupsError } from "../Sidebar/actions";
import { do_post, do_put, do_delete } from "../api/actions";

const updatePersonStore = (person) => ({
	type: UPDATE_PERSON,
	data: person,
});

const updatePersonError = (message) => ({
	type: UPDATE_PERSON_ERROR,
	data: message,
});

export const doTestExport = (group_name, ugid) => {
	return { type: "DO_TEST", data: { group_name, ugid } };
};


export const updatePerson = (n_person, ugid = null, uuid = null) => async (
	dispatch
) => {
	let { name, email, person_id, nots } = n_person;
	nots = '|'+nots.join('|')+'|';
	let response = await do_put("updateperson", {
		name,
		email,
		person_id,
		nots,
		uuid,
	});

	if (response.status === 200) {
		dispatch(updatePersonStore(n_person));
	} else {
		dispatch(updatePersonError(response));
	}
	return {
		type: ADD_PERSON,
	};
};

export const addPerson = ({ name, email }, ugid = 0, uuid = null) => async (
	dispatch
) => {
	let response = await do_post("addperson", {
		name,
		email,
		ugid,
		uuid,
	});
	if (response.status === 200) {
		dispatch(loadSelectedGroup(ugid, uuid));
	} else {
		dispatch(updatePersonError(response));
	}
	return {
		type: ADD_PERSON,
	};
};

export const deletePerson = ({ person_id }, ugid, uuid = null) => async (
	dispatch
) => {
	let response = await do_delete("deleteperson?id=" + person_id, uuid);
	if (response.status === 200) {
		dispatch(loadSelectedGroup(ugid, uuid));
	} else {
		dispatch(updatePersonError(response));
	}
	return {
		type: DELETE_PERSON,
	};
};

export const addGroup = ({ group_name }, uuid = null) => async (dispatch) => {
	console.log("my uuid:", uuid);
	let response = await do_post("creategroup", { group_name, uuid });
	if (response.status === 200) {
		dispatch(loadGroupList(uuid));
	} else {
		dispatch(loadGroupsError(response));
	}
	return {
		type: ADD_GROUP,
	};
};

export const updateGroup = (groupvars, ugid, uuid = null) => async (
	dispatch
) => {
	const { group_name, public_group,sent } = groupvars;
	console.log(groupvars);
	let response = await do_put("updategroup", {
		group_name,
		public_group,
		sent,
		ugid,
		uuid,
	});
	if (response.status === 200) {
		dispatch(loadGroupList(uuid)).then(
			dispatch(loadSelectedGroup(ugid, uuid))
		);
	} else {
		dispatch(loadGroupsError(response));
	}
	return {
		type: UPDATE_GROUP,
	};
};

export const deleteGroup = (ugid, uuid = null) => async (dispatch) => {
	let response = await do_delete("deletegroup?ugid=" + ugid, uuid);
	if (response.status === 200) {
		dispatch(loadGroupList(uuid));
		dispatch(clearSelectedGroup());
	} else {
		dispatch(loadGroupsError(response));
	}
	return {
		type: DELETE_GROUP,
	};
};