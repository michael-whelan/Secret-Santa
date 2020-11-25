import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActiveGroup from "../components/ActiveGroup/ActiveGroup";
import ModalContainer from "./ModalContainer";
import { withRouter, useRouteMatch } from "react-router-dom";
import {
	loadSelectedGroup,
	sendMailToGroup,
} from "../store/ActiveGroup/actions";

const ActiveGroupContainer = () => {
	const selectedGroup = useSelector((state) => state.activeGroup);
	const user = useSelector((state) => state.auth.user);
	const people = useSelector((state) => state.activeGroup.people);
	const errorMsg = useSelector((state) => state.activeGroup.errorMsg);

	const [modalShow, setModalShow] = useState(false);
	const [activeObject, setActiveObject] = useState({});
	const [modalType, setModalType] = useState("update");
	const [modalHeading, setModalHeading] = useState("update");

	const dispatch = useDispatch();
	const {
		params: { ugid },
	} = useRouteMatch("/groups/:ugid");
	useEffect(() => {
		ugid &&
			(!selectedGroup.ugid || selectedGroup.ugid !== ugid) &&
			(user
				? dispatch(loadSelectedGroup(ugid, user.sub))
				: dispatch(loadSelectedGroup(ugid)));
	}, [user]);

	const submitFunction = () => {
		!user ?
		alert(`You must be logged in and be the group admin to send emails or reactivete`)
		: selectedGroup.sent === 0
			? checkEmails() && dispatch(sendMailToGroup(ugid, user.sub))
			: reactivateModal();
	};

	const reactivateModal = () => {
		setModalShow(true);
		setActiveObject({});
		setModalType("reactivate-group");
		setModalHeading("Reactivate Group");
	};

	const checkEmails = () => {
		const re = /(?:[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
		for (let i = 0; i < people.length; ++i) {
			let person = people[i];
			if (!re.test(String(person.email).toLowerCase())) {
				alert(`Something is wrong. Please check your email address for ${person.name}`);
				return false;
			}
		}
		return true;
	};

	return (
		<>
			{modalShow && (
				<ModalContainer
					show={modalShow}
					onHide={() => setModalShow(false)}
					currData={Object.assign({}, activeObject)}
					ugid={selectedGroup.ugid}
					modalType={modalType}
					heading={modalHeading}
					animation={false}
					people={people}
				/>
			)}
			<ActiveGroup
				groupDetails={selectedGroup}
				people={people}
				errorMsg={errorMsg.message}
				setModalShow={(show) => setModalShow(show)}
				setActiveObject={(obj) => setActiveObject(obj)}
				setModalType={(type) => setModalType(type)}
				setModalHeading={(heading) => setModalHeading(heading)}
				onSubmit={() => submitFunction()}
			/>
		</>
	);
};

export default withRouter(ActiveGroupContainer);
