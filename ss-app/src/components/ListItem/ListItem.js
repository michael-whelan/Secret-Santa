import React from "react";
import PropTypes from "prop-types";
import ListGroup from "react-bootstrap/ListGroup";
import "./ListItem.css";

const ListItem = ( {group_name ,id, selectGroup} ) => {
	const handleSelect = () => {
		selectGroup(id);
    };

	return <ListGroup.Item onClick={handleSelect}>{group_name}</ListGroup.Item>;
};

ListItem.propTypes = {
	group_name: PropTypes.string.isRequired,
	selectGroup: PropTypes.func.isRequired,
};

export default ListItem;
