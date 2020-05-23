import React from "react";
import "./ActiveGroup.css";
import ListGroup from "react-bootstrap/ListGroup";
import PersonContainer from "../../containers/PersonContainer";
import Button from "react-bootstrap/Button";
import logo from "../../icons/icons8-edit-file-52.png";
import PropTypes from "prop-types";
import Spinner from "react-bootstrap/Spinner";

const ActiveGroup = ({
	groupDetails = {},
	people = [],
	errorMsg = "",
	onSubmit,
	setModalShow,
	setActiveObject,
	setModalType,
	setModalHeading,
}) => {
	return (
		<div className="main-area">
			<div
				className={
					groupDetails.sent ? "activegroup sent" : "activegroup"
				}
			>
				<div
					className="activegroup-header"
					onClick={() => {
						setModalType("update-group");
						setModalShow(true);
						setModalHeading("Edit Group");
						setActiveObject(groupDetails);
					}}
				>
					<h2 className="group-title">{groupDetails.group_name}</h2>
					<img alt="" className="group-edit" src={logo} />
				</div>
				<ListGroup>
					{people.map((p, index) => (
						<PersonContainer
							key={index}
							person={p}
							disabled={groupDetails.sent}
							clickAction={() => {
								setModalShow(true);
								setModalType("update");
								setActiveObject(p);
								setModalHeading("Edit Person");
							}}
						/>
					))}
				</ListGroup>
				{groupDetails.group_name && (
					<>
						<Button
							variant="outline-primary"
							className="add-person-btn"
							disabled={groupDetails.sent}
							onClick={() => {
								setModalShow(true);
								setActiveObject({});
								setModalType("add");
								setModalHeading("Add New Person");
							}}
						>
							Add Person
						</Button>
						<Button
							variant="outline-primary"
							className="send-emails"
							onClick={() => {
								onSubmit();
							}}
						>
							{groupDetails.sent === 0
								? "Send Secret Santa"
								: "Reactivate Group"}
						</Button>
					</>
				)}
				<span className="error">{errorMsg}</span>
			</div>
		</div>
	);
};

ActiveGroup.propTypes = {
	groupDetails: PropTypes.object,
	people: PropTypes.array,
	errorMsg: PropTypes.string,
	onSubmit: PropTypes.func,
};

export default ActiveGroup;
