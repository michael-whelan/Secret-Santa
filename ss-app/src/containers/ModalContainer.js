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
import { getModalMap } from "../utils/ModalMap";
import { useHistory } from "react-router";
import TextInput from "../components/TextInput";
import CheckInput from "../components/CheckInput";
import MultiSelInput from "../components/MultiSelInput";

const ModalContainer = ({ ugid, modalType, currData, people, ...props }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const uuid = user ? user.sub : null;
	const history = useHistory();

	const [tempData, updateTempData] = React.useState({ currData });
	tempData !== currData && updateTempData(currData);

	const handleChange = ({ target: { value, dataset, type, ...props } }) => {
		let localDataObj = currData;
		type === "checkbox"
			? (localDataObj[dataset.link] = props.checked ? 1 : 0)
			: (localDataObj[dataset.link] = value);
		updateTempData(localDataObj);
	};

	const formMultiSelList = () => {
		const selectable = [];
		const selected = [];
		people.map(
			(person) =>
				currData.person_id !== person.person_id &&
				selectable.push({
					show: person.name,
					data: person.person_id,
				}) &&
				currData.nots.includes(person.person_id.toString()) &&
				selected.push({ show: person.name, data: person.person_id })
		);
		console.log(currData.nots)
		return { selectable: selectable, selected: selected };
	};

	const localAddPerson = () => {
		dispatch(addPerson(tempData, ugid, uuid));
	};
	const localUpdatePerson = () => {
		dispatch(updatePerson(tempData, ugid, uuid));
	};
	const localDeletePerson = () => {
		dispatch(deletePerson(tempData, ugid, uuid));
	};
	const localAddGroup = () => {
		console.log(user.sub);
		dispatch(addGroup(tempData, uuid));
	};
	const localUpdateGroup = () => {
		dispatch(updateGroup(tempData, ugid, uuid));
	};
	const localDeleteGroup = () => {
		history.push(`/`);
		dispatch(deleteGroup(ugid, uuid));
	};

	const funcs = {
		localAddPerson: localAddPerson,
		localUpdatePerson: localUpdatePerson,
		localDeletePerson: localDeletePerson,
		localAddGroup: localAddGroup,
		localUpdateGroup: localUpdateGroup,
		localDeleteGroup: localDeleteGroup,
	};
	console.log("Render Container");

	const genElem = ({ type, label, link, placeholder }, index) => {
		if (type === "text") {
			return (
				<TextInput
					key={index}
					label={label}
					link={link}
					givenVal={currData[link]}
					placeholder={placeholder}
					handleChange={handleChange}
				/>
			);
		} else if (type === "check") {
			return (
				<CheckInput
					key={index}
					label={label}
					link={link}
					givenVal={currData[link]}
					handleChange={handleChange}
				/>
			);
		} else if (type === "multi") {
			return (
				<MultiSelInput
					key={index}
					label={"Not list"}
					link={link}
					lists={formMultiSelList()}
					handleSelect={(info) => {
						console.log(info);
					}}
				/>
			);
		}
	};
	const elemList = [];
	getModalMap(modalType, funcs).map(
		(elem, index) =>
			elem.type !== "button" && elemList.push(genElem(elem, index))
	);
	return (
		<ModalPopup
			{...props}
			modalMap={getModalMap(modalType, funcs)}
			childElements={elemList}
			show={true}
		/>
	);
};

export default ModalContainer;
