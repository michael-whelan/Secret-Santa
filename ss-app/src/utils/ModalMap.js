export const getModalMap = (type, functionList) => {
	switch (type) {
		case "update":
			return [
				{
					label: "Name",
					type: "text",
					placeholder: "Username",
					link: "name",
				},
				{
					label: "email",
					type: "text",
					placeholder: "email",
					link: "email",
				},
				{
					label: "DELETE",
					type: "button",
					color: "danger",
					func: functionList["localDeletePerson"],
				},
				{
					label: "Update",
					type: "button",
					color: "primary",
					func: functionList["localUpdatePerson"],
				},
			];
		case "add":
			return [
				{
					label: "Name",
					type: "text",
					placeholder: "Username",
					link: "name",
				},
				{
					label: "email",
					type: "text",
					placeholder: "email",
					link: "email",
				},
				{
					label: "Add",
					type: "button",
					color: "primary",
					func: functionList["localAddPerson"],
				},
			];
		case "add-group":
			return [
				{
					label: "Group Name",
					type: "text",
					placeholder: "My Group",
					link: "group_name",
				},
				{
					label: "Add",
					type: "button",
					color: "primary",
					func: functionList["localAddGroup"],
				},
			];
		case "update-group":
			return [
				{
					label: "Group Name",
					type: "text",
					placeholder: "Group Name",
					link: "group_name",
				},
				{
					label: "DELETE",
					type: "button",
					color: "danger",
					func: functionList["localDeleteGroup"],
				},
				{
					label: "Update",
					type: "button",
					color: "primary",
					func: functionList["localUpdateGroup"],
				},
			];
		default:
			return [
				{
					label: "This is a test. You shouldnt see this",
					type: "label",
					default: "",
					link: "",
				},
			];
	}
};