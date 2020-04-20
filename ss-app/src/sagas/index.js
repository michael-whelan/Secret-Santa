import { all, call, put, takeEvery } from "redux-saga/effects";
import {
	RENDER_GROUP,
	RENDER_GROUP_LIST,
	HANDLE_AUTHENTICATION_CALLBACK,
	USER_PROFILE_LOADED,
} from "../store/Sidebar/types";

import { LOAD_GROUP_LIST, LOAD_GROUP } from "../store/sagas/types";

import { takeLatest } from "redux-saga/effects";
import { handleAuthentication } from "../Auth";

const endpoint = "http://localhost:8080/";

export function* fetchGroupList() {
	const url = endpoint + "getgroups";
	const response = yield call(fetch, url);
	const data = yield response.json();
	yield put({ type: RENDER_GROUP_LIST, groupList: data });
}

export function* fetchGroup(id) {
	console.log("fetchGroup")
	const url = endpoint + "getgroup?id=" + id;
	const response = yield call(fetch, endpoint);
	const data = yield response.json();
	yield put({ type: RENDER_GROUP, groupList: data });
}

export function* loadGroupList() {
	yield takeEvery(LOAD_GROUP_LIST, fetchGroupList);
}

export function* loadGroup() {
	console.log("loadGroup")
	let id=1
	yield takeEvery(LOAD_GROUP, fetchGroup(id));
}

export function* parseHash() {
	const user = yield call(handleAuthentication);
	yield put({ type: USER_PROFILE_LOADED, user });
}

export function* handleAuthenticationCallback() {
	yield takeLatest(HANDLE_AUTHENTICATION_CALLBACK, parseHash);
}

export default function* rootSaga() {
	yield all([loadGroupList(), handleAuthenticationCallback()]);
}
