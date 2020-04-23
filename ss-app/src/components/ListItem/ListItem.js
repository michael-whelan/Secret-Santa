import React from "react";
import PropTypes from "prop-types";
import ListGroup from "react-bootstrap/ListGroup";
import "./ListItem.css";

const ListItem = ({ group,setGroup, selectGroup, selected }) => {
	const handleSelect = () => {
        setGroup(group);
		selectGroup(group);
	};

	return (
		<ListGroup.Item
			onClick={handleSelect}
			className={selected && "active"}
		>
			{group.group_name}
		</ListGroup.Item>
	);
};

ListItem.propTypes = {
	group: PropTypes.shape({
		id: PropTypes.number.isRequired,
		group_name: PropTypes.string.isRequired,
	}).isRequired,
	selectGroup: PropTypes.func.isRequired,
};

export default ListItem;
