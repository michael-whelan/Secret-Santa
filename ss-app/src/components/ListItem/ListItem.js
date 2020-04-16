import React from "react";
import PropTypes from "prop-types";
import ListGroup from "react-bootstrap/ListGroup";
import "./ListItem.css";

const ListItem = ({ title }) => <ListGroup.Item>{title}</ListGroup.Item>;

ListItem.propTypes = {
	title: PropTypes.string.isRequired,
};

export default ListItem;
