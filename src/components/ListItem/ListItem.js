import React from "react";
import PropTypes from "prop-types";
import ListGroup from "react-bootstrap/ListGroup";
import "./ListItem.css";

const ListItem = ({ title, selectGroup }) => {
	console.log(selectGroup);
	const logStuff = () => {
		console.log("stuff");
		selectGroup();
	};

	return <ListGroup.Item onClick={logStuff}>{title}</ListGroup.Item>;
};

ListItem.propTypes = {
	title: PropTypes.string.isRequired,
};

export default ListItem;
