import React from "react";
import PropTypes from "prop-types";
import InputGroup from "react-bootstrap/InputGroup";

const CheckInput = ({ label, link, givenVal, handleChange }) => (
	<InputGroup className="mb-check-holder" >
		<InputGroup.Text className="mb-check-label" id="basic-addon1">
			{label}
		</InputGroup.Text>
		<input
			type="checkbox"
			data-link={link}
			className="mb-checkbox"
			onChange={handleChange.bind(this)}
			value={givenVal === 1 ? true : false}
			defaultChecked={givenVal}
		/>
	</InputGroup>
);

CheckInput.propTypes = {
	label: PropTypes.string.isRequired,
};

export default CheckInput;
