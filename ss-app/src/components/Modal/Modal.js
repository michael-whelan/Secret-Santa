import React from "react";
import "./Modal.css";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import TextInput from "../TextInput";
import CheckInput from "../CheckInput";

function ModalPopup({
	heading = "Modal Heading",
	currData = {},
	modalMap,
	dispatch,
	...props
}) {
	const [tempData, updateTempData] = React.useState({ currData });
	tempData !== currData && updateTempData(currData);

	const handleChange = ({ target: { value, dataset, type, ...props } }) => {
		//console.log(value, dataset, type, currData);
		let localDataObj = currData;
		type === "checkbox"
			? (localDataObj[dataset.link] = props.checked ? 1 : 0)
			: (localDataObj[dataset.link] = value);
		updateTempData(localDataObj);
	};

	const multiInput = (label, link, placeholder, index) => {
		const arr = [];
		currData[link].forEach((element, i) => {
			arr.push(<Badge key={index + "-" + i}>{element}</Badge>);
		});
		return arr;
	};

	const genElem = (elem, index) => {
		if (elem.type === "text") {
			return (
				<TextInput
					key={index}
					label={elem.label}
					link={elem.link}
					givenVal={currData[elem.link]}
					placeholder={elem.default}
					handleChange={handleChange}
				/>
			);
		} else if (elem.type === "check") {
			return (
				<CheckInput
					key={index}
					label={elem.label}
					link={elem.link}
					givenVal={currData[elem.link]}
					placeholder={elem.default}
					handleChange={handleChange}
				/>
			);
		} else if (elem.type === "multi") {
			return multiInput(elem.label, elem.link, elem.default, index);
		}
	};

	return (
		<Modal
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			{...props}
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					{heading}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{modalMap.map((elem, index) => genElem(elem, index))}
			</Modal.Body>
			<Modal.Footer>
				{modalMap.map(
					(elem, index) =>
						elem.type === "button" && (
							<Button
								key={index}
								variant={elem.color}
								onClick={() => {
									elem.func(tempData);
									props.onHide();
								}}
							>
								{elem.label}
							</Button>
						)
				)}
				<Button
					onClick={() => {
						props.onHide();
						updateTempData({});
					}}
				>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

ModalPopup.propTypes = {
	modalMap: PropTypes.array.isRequired,
	currData: PropTypes.object.isRequired,
};

export default ModalPopup;
