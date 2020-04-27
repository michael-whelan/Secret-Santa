import React from "react";
import "./Modal.css";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

function ModalPopup({
	heading = "Modal Heading",
	people,
	person = {},
	modalMap,
	dispatch,
	dispatcher,
	...props
}) {
	const [tempPerson, updateTempPerson] = React.useState(person);
	const handleChange = ({ target: { value, dataset } }) => {
		let localP = person;
		localP[dataset.link] = value;
		updateTempPerson(localP);
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
						elem.type !== "button" && (
							<InputGroup className="mb-3" key={index}>
								<InputGroup.Prepend>
									<InputGroup.Text id="basic-addon1">
										{elem.label}
									</InputGroup.Text>
								</InputGroup.Prepend>
								<FormControl
									placeholder={elem.default}
									aria-label={elem.default}
									aria-describedby="basic-addon1"
									data-link={elem.link}
									defaultValue={person[elem.link]}
									onChange={handleChange.bind(this)}
								/>
							</InputGroup>
						)
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
