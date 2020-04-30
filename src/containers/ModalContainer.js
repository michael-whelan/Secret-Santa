import React from "react";
import { useDispatch } from "react-redux";
import ModalPopup from "../components/Modal/Modal";
import { updatePerson, addPerson, deletePerson, addGroup } from "../store/Modal/actions";
import { doTestExport } from "../store/Modal/actions";
import { getModalMap } from "../utils/ModalMap"

const ModalContainer = ({ group_id, modalType, ...props }) => {
	const dispatch = useDispatch();

	const localAddPerson=( vars)=>{
		dispatch(addPerson(vars, group_id))
	}
	const localUpdatePerson=( vars)=>{
		dispatch(updatePerson(vars, group_id))
	}
	const localDeletePerson=( vars)=>{
		dispatch(deletePerson(vars, group_id))
	}
	const localAddGroup=( vars)=>{
		dispatch(addGroup(vars, group_id))
	}
	const funcs = {
		"localAddPerson": localAddPerson,
		"localUpdatePerson": localUpdatePerson,
		"localDeletePerson": localDeletePerson,
		"localAddGroup":localAddGroup

	}
	return (
		<ModalPopup
			{...props}
			modalMap={getModalMap(modalType,funcs)}
		/>
	);
};


export default ModalContainer;
