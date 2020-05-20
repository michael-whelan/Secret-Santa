import React from "react";
import PropTypes from "prop-types";
import ListGroup from "react-bootstrap/ListGroup";
import "./SimpleComponents.css";

const ListItem = ({ group, selectGroup }) => {
	const handleSelect = () => {
		selectGroup(group);
	};

	return (
		<ListGroup.Item onClick={handleSelect} className={group.sent ===1 && "sent"}>
			{group.group_name}
		</ListGroup.Item>
	);
};

ListItem.propTypes = {
	group: PropTypes.shape({
		group_url_id: PropTypes.string.isRequired,
		group_name: PropTypes.string.isRequired,
	}).isRequired,
	selectGroup: PropTypes.func.isRequired,
};

export default ListItem;
