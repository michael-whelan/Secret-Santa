import React from "react";
import { useDispatch } from "react-redux";
import ModalPopup from "../components/Modal/Modal";
import { updatePerson, addPerson, deletePerson, addGroup } from "../store/Modal/actions";
import { doTestExport } from "../store/Modal/actions";

const ModalContainer = ({ group_id, modalType, ...props }) => {
	const getModalMap = (type) => {
		switch (type) {
			case "update":
				return [
					{
						label: "Name",
						type: "text",
						placeholder: "Username",
						link: "name",
					},
					{
						label: "email",
						type: "text",
						placeholder: "email",
						link: "email",
					},
					{
						label: "DELETE",
						type: "button",
						color: "danger",
						func: localDeletePerson,
					},
					{
						label: "Update",
						type: "button",
						color: "primary",
						func: localUpdatePerson,
					},
				];
			case "add":
				return [
					{
						label: "Name",
						type: "text",
						placeholder: "Username",
						link: "name",
					},
					{
						label: "email",
						type: "text",
						placeholder: "email",
						link: "email",
					},
					{
						label: "Add",
						type: "button",
						color: "primary",
						func: localAddPerson,
					},
				];
			case "add-group":
				return [
					{
						label: "Group Name",
						type: "text",
						placeholder: "My Group",
						link: "group_name",
					},
					{
						label: "Add",
						type: "button",
						color: "primary",
						func: localAddGroup,
					},
				];
			case "update-group":
				return [
					{
						label: "Group Name",
						type: "text",
						placeholder: "Group Name",
						link: "group_name",
					},
					{
						label: "DELETE",
						type: "button",
						color: "danger",
						func: doTestExport,
					},
					{
						label: "Update",
						type: "button",
						color: "primary",
						func: doTestExport,
					},
				];
			default:
				return [
					{
						label: "This is a test. You shouldnt see this",
						type: "label",
						default: "",
						link: "",
					},
				];
		}
	};
	
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
	return (
		<ModalPopup
			{...props}
			modalMap={getModalMap(modalType)}
		/>
	);
};


export default ModalContainer;
