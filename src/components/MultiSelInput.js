import React from "react";
import PropTypes from "prop-types";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from "react-bootstrap/Dropdown";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
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

const CustomMenu = React.forwardRef(
	({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
		const [value, setValue] = React.useState("");

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

const MultiSelInput = ({ label, link, lists, handleSelect }) => {
	console.log(lists);
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
				<span key={index}>{show}</span>
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
