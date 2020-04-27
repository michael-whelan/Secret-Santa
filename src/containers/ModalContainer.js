import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalPopup from "../components/Modal/Modal";
import { updatePerson, addPerson } from "../store/Modal/actions";

const ModalContainer = ({ group_id, modalType, ...props }) => {
	const dispatch = useDispatch();

	const {
		activeGroup: { people },
	} = useSelector((state) => state);

	const dispatcher = (func, vars) => {
		dispatch(func(vars, group_id));
	};

	return (
		<ModalPopup
			{...props}
			modalMap={getModalMap(modalType)}
			people
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
					default: "Username",
					link: "name",
				},
				{
					label: "email",
					type: "text",
					default: "email",
					link: "email",
				},
				{
					label: "DELETE",
					type: "button",
					color: "danger",
					func: updatePerson,
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
					default: "Username",
					link: "name",
				},
				{
					label: "email",
					type: "text",
					default: "email",
					link: "email",
				},
				{
					label: "Add",
					type: "button",
					color: "primary",
					func: addPerson,
				},
			];
	}
};

export default ModalContainer;
