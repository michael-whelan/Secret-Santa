import { all, call, put, takeEvery } from 'redux-saga/effects';
import { LOAD_GROUP_LIST, RENDER_GROUP_LIST } from "../store/Sidebar/actions";
import { takeLatest } from 'redux-saga/effects';
import { HANDLE_AUTHENTICATION_CALLBACK, USER_PROFILE_LOADED } from '../store/Sidebar/actions';
import { handleAuthentication } from '../Auth';


export function* fetchGroupList() {
	const endpoint =
		"https://gist.githubusercontent.com/brunokrebs/f1cacbacd53be83940e1e85860b6c65b/raw/to-do-items.json";
	const response = yield call(fetch, endpoint);
	const data = yield response.json();
	yield put({ type: RENDER_GROUP_LIST, groupList: data });
}

export function* loadToDoList() {
	yield takeEvery(LOAD_GROUP_LIST, fetchGroupList);
}

export function* parseHash() {
  const user = yield call(handleAuthentication);
  yield put({ type: USER_PROFILE_LOADED, user });
}

export function* handleAuthenticationCallback() {
  yield takeLatest(HANDLE_AUTHENTICATION_CALLBACK, parseHash);
}

export default function* rootSaga() {
  yield all([loadToDoList(), handleAuthenticationCallback()]);
}
