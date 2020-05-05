import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalPopup from "../components/Modal/Modal";
import {
	updatePerson,
	addPerson,
	deletePerson,
	addGroup,
	updateGroup,
	deleteGroup,
} from "../store/Modal/actions";
import { doTestExport } from "../store/Modal/actions";
import { getModalMap } from "../utils/ModalMap";
import { useHistory } from "react-router";

const ModalContainer = ({ group_id, modalType, ...props }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const uuid = user ? user.sub : null;
	const history = useHistory();

	const localAddPerson = (vars) => {
		dispatch(addPerson(vars, group_id, uuid));
	};
	const localUpdatePerson = (vars) => {
		dispatch(updatePerson(vars, group_id, uuid));
	};
	const localDeletePerson = (vars) => {
		dispatch(deletePerson(vars, group_id, uuid));
	};
	const localAddGroup = (vars) => {
		console.log(user.sub);
		dispatch(addGroup(vars, uuid));
	};
	const localUpdateGroup = (vars) => {
		dispatch(updateGroup(vars, group_id, uuid));
	};
	const localDeleteGroup = (vars) => {
		history.push(`/`);
		dispatch(deleteGroup(group_id, uuid));
	};

	const funcs = {
		localAddPerson: localAddPerson,
		localUpdatePerson: localUpdatePerson,
		localDeletePerson: localDeletePerson,
		localAddGroup: localAddGroup,
		localUpdateGroup: localUpdateGroup,
		localDeleteGroup: localDeleteGroup,
	};
	return props.show ? (
		<ModalPopup {...props} modalMap={getModalMap(modalType, funcs)} />
	) : (
		<></>
	);
};

export default ModalContainer;
