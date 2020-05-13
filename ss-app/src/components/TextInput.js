import React from "react";
import PropTypes from "prop-types";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

const TextInput = ({ label, link, givenVal, placeholder, handleChange }) => (
	<InputGroup className="mb-3">
		<InputGroup.Prepend>
			<InputGroup.Text id="basic-addon1">{label}</InputGroup.Text>
		</InputGroup.Prepend>
		<FormControl
			placeholder={placeholder}
			aria-label={placeholder}
			aria-describedby="basic-addon1"
			data-link={link}
			defaultValue={givenVal}
			onChange={handleChange.bind(this)}
		/>
	</InputGroup>
);

TextInput.propTypes = {
	label: PropTypes.string.isRequired,
};

export default TextInput;
