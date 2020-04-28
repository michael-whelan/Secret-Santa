import React from "react";
import "./Modal.css";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

function ModalPopup({
	heading = "Modal Heading",
	person = {},
	modalMap,
	dispatch,
	dispatcher,
	...props
}) {
	const [tempPerson, updateTempPerson] = React.useState(person);
	tempPerson !== person && updateTempPerson(person);

	const handleChange = ({ target: { value, dataset } }) => {
		let localP = person;
		localP[dataset.link] = value;
		updateTempPerson(localP);
	};

	const textInput = (label, link, placeholder, index) => {
		return (
			<InputGroup className="mb-3" key={index}>
				<InputGroup.Prepend>
					<InputGroup.Text id="basic-addon1">{label}</InputGroup.Text>
				</InputGroup.Prepend>
				<FormControl
					placeholder={placeholder}
					aria-label={placeholder}
					aria-describedby="basic-addon1"
					data-link={link}
					defaultValue={person[link]}
					onChange={handleChange.bind(this)}
				/>
			</InputGroup>
		);
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
				<h4>Centered Modal</h4>
				{modalMap.map(
					(elem, index) =>
						elem.type === "text" &&
						textInput(elem.label, elem.link, elem.default, index)
					// elem.type === "label" &&
					// showLabel(elem.label)
				)}
			</Modal.Body>
			<Modal.Footer>
				{modalMap.map(
					(elem, index) =>
						elem.type === "button" && (
							<Button
								key={index}
								variant={elem.color}
								onClick={() => {
									dispatcher(elem.func, tempPerson);
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
						updateTempPerson({});
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
};

export default ModalPopup;
