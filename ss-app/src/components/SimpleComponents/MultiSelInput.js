import React, { useState, forwardRef } from "react";
import PropTypes from "prop-types";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import "./SimpleComponents.css";

const CustomToggle = forwardRef(({ children, onClick }, ref) => (
	<a
		href=""
		ref={ref}
		onClick={(e) => {
			e.preventDefault();
			onClick(e);
		}}
	>
		{children}
		&#x25bc;
	</a>
));

const CustomMenu = forwardRef(
	({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
		const [value, setValue] = useState("");

		return (
			<div
				ref={ref}
				style={style}
				className={className}
				aria-labelledby={labeledBy}
			>
				<FormControl
					autoFocus
					className="mx-3 my-2 w-auto"
					placeholder="Type to filter..."
					onChange={(e) => setValue(e.target.value)}
					value={value}
				/>
				<ul className="list-unstyled">
					{React.Children.toArray(children).filter(
						(child) =>
							!value ||
							child.props.children.toLowerCase().startsWith(value)
					)}
				</ul>
			</div>
		);
	}
);

const MultiSelInput = ({ label, link, lists, handleSelect, handleRemove }) => {
	return (
		<div>
			<Dropdown>
				<Dropdown.Toggle
					as={CustomToggle}
					id="dropdown-custom-components"
				>
					{label}
				</Dropdown.Toggle>

				<Dropdown.Menu as={CustomMenu}>
					{lists.selectable.map(({ show, data }, index) => (
						<Dropdown.Item
							onClick={() => handleSelect(data)}
							eventKey={data}
							key={index}
						>
							{show}
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown>
			{lists.selected.map(({ show, data }, index) => (
				<Badge pill variant="danger" key={index} className={"not-node"}>
					{show}
					<span onClick={() => handleRemove(data)} className="remove">
						X
					</span>
				</Badge>
			))}
		</div>
	);
};

MultiSelInput.propTypes = {
	label: PropTypes.string.isRequired,
	lists: PropTypes.shape({
		selectable: PropTypes.array.isRequired,
		selected: PropTypes.array.isRequired,
	}).isRequired,
};

export default MultiSelInput;
