import {
	LOAD_GROUP_ERROR,
	STORE_SELECTED_GROUP,
	FETCH_GROUP,
	CLEAR_SELECTED_GROUP,
} from "./types";
import { do_get } from "../api/actions";
import { loadGroupList } from "../Sidebar/actions";


const loadGroupError = (message) => ({
	type: LOAD_GROUP_ERROR,
	data: message,
});

const storeSelectedGroup = (data) => ({
	type: STORE_SELECTED_GROUP,
	data: data,
});

export const clearSelectedGroup = () => ({
	type: CLEAR_SELECTED_GROUP,
});

export const loadSelectedGroup = (ugid, uuid = null) => async (dispatch) => {
	let response = await do_get("getgroup", { ugid: ugid, uuid: uuid });
	if (response.status === 200) {
		dispatch(storeSelectedGroup(response.data));
	} else {
		dispatch(loadGroupError(response));
	}
	return {
		type: FETCH_GROUP,
	};
};

export const sendMailToGroup = (ugid, uuid = null) => async (dispatch) => {
	console.log("show loader");
	let response = await do_get("sendmail", { ugid: ugid, uuid: uuid });
	if (response.status === 200) {
		dispatch(loadGroupList(uuid)).then(
			dispatch(loadSelectedGroup(ugid, uuid))
		);
		console.log("stop loader");
	} else {
		console.log("Error sending mail", response);
		//dispatch(loadGroupsError(response));
	}
	return {
		type: "UPDATE_GROUP",
	};
};
