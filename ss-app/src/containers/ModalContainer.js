import React from "react";
import { useDispatch } from "react-redux";
import ModalPopup from "../components/Modal/Modal";
import { updatePerson, addPerson, deletePerson, addGroup } from "../store/Modal/actions";
import { doTestExport } from "../store/Modal/actions";

const ModalContainer = ({ group_id, modalType, ...props }) => {
	const dispatch = useDispatch();

	// const {
	// 	activeGroup: { people },
	// } = useSelector((state) => state);

	const dispatcher = (func, vars) => {
		dispatch(func(vars, group_id));
	};
	return (
		<ModalPopup
			{...props}
			modalMap={getModalMap(modalType)}
			dispatcher={dispatcher}
		/>
	);
};

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
					func: deletePerson,
				},
				{
					label: "Update",
					type: "button",
					color: "primary",
					func: updatePerson,
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
					func: addPerson,
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
					func: addGroup,
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

export default ModalContainer;
