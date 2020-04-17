import React from "react";
import PropTypes from "prop-types";
import ListGroup from "react-bootstrap/ListGroup";
import "./ListItem.css";

const logStuff = () => {
	console.log("stuff");
};

const ListItem = ({ title, selectGroup }) => {
	console.log(selectGroup);
	return <ListGroup.Item onClick={selectGroup}>{title}</ListGroup.Item>;
};

ListItem.propTypes = {
	title: PropTypes.string.isRequired,
};

export default ListItem;
