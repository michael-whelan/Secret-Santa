import React from "react";
import "./ActiveGroup.css";

const ActiveGroup = ({group={}}) => {
    console.log(group);
	return (
		<div className="activegroup">
			<div className="activegroup-header">
				<h2>{group.group_name}</h2>
			</div>
		</div>
	);
};

export default ActiveGroup;
