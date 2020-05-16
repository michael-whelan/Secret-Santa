import React from "react";
import "./Modal.css";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ModalPopup({
	heading = "Modal Heading",
	modalMap,
	dispatch,
	childElements,
	...props
}) {
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
				{childElements.map((child, index) => child)}
			</Modal.Body>
			<Modal.Footer>
				{modalMap.map(
					(elem, index) =>
						elem.type === "button" && (
							<Button
								key={index}
								variant={elem.color}
								onClick={() => {
									elem.func();
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
