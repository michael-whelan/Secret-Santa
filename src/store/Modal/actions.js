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
import {
	loadGroupList,
	loadGroupsError,
	doSelectGroup,
} from "../Sidebar/actions";
import { do_post, do_put, do_delete } from "../api/actions";

const updatePersonStore = (person) => ({
	type: UPDATE_PERSON,
	data: person,
});

const updatePersonError = (message) => ({
	type: UPDATE_PERSON_ERROR,
	data: message,
});

export const doTestExport = (group_name, group_id) => {
	return { type: "DO_TEST", data: { group_name, group_id } };
};

export const updatePerson = (n_person,group_id = null,uuid=null) => async (dispatch) => {
	const { name, email, person_id } = n_person;
	console.log()
	let response = await do_put("updateperson", {
		name,
		email,
		person_id,
		uuid
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

export const addPerson = ({ name, email }, group_id = 0, uuid=null) => async (
	dispatch
) => {
	let response = await do_post("addperson", {
		name,
		email,
		group_id,
		uuid
	});
	if (response.status === 200) {
		dispatch(loadSelectedGroup(group_id));
	} else {
		dispatch(updatePersonError(response));
	}
	return {
		type: ADD_PERSON,
	};
};

export const deletePerson = ({ person_id }, group_id,uuid=null) => async (dispatch) => {
	let response = await do_delete("deleteperson?id=" + person_id, uuid);
	if (response.status === 200) {
		dispatch(loadSelectedGroup(group_id));
	} else {
		dispatch(updatePersonError(response));
	}
	return {
		type: DELETE_PERSON,
	};
};

export const addGroup = ({ group_name}, uuid=null) => async (dispatch) => {
	console.log("my uuid:", uuid)
	let response = await do_post("creategroup", { group_name,uuid });
	if (response.status === 200) {
		dispatch(loadGroupList(uuid));
	} else {
		dispatch(loadGroupsError(response));
	}
	return {
		type: ADD_GROUP,
	};
};

export const updateGroup = (groupvars, group_id,uuid=null) => async (dispatch) => {
	const {group_name, public:public_group} = groupvars;
	let response = await do_put("updategroup", {
		group_name,
		public_group,
		group_id,
		uuid,
	});
	if (response.status === 200) {
		dispatch(loadGroupList(uuid)).then(dispatch(loadSelectedGroup(group_id)));
	} else {
		dispatch(loadGroupsError(response));
	}
	return {
		type: UPDATE_GROUP,
	};
};

export const deleteGroup = (group_id,uuid=null) => async (dispatch) => {
	let response = await do_delete("deletegroup?group_id=" + group_id, uuid);
	if (response.status === 200) {
		dispatch(loadGroupList(uuid));
		dispatch(doSelectGroup(null));
		dispatch(clearSelectedGroup());
	} else {
		dispatch(loadGroupsError(response));
	}
	return {
		type: DELETE_GROUP,
	};
};
