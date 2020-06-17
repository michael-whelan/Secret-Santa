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
					label: "Email",
					type: "text",
					placeholder: "email",
					link: "email",
				},
				{
					label: "Nots",
					type: "multi",
					placeholder: "Not to match with",
					link: "nots",
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
					label: "Public",
					type: "check",
					link: "public_group",
					placeholder: false,
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
					label: "Public",
					type: "check",
					link: "public_group",
					placeholder: false,
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
			case "reactivate-group":
				return [
					{
						type: "info",
						placeholder: "Are you sure you would like to reactivate this group?",
					},
					{
						label: "Confirm",
						type: "button",
						color: "primary",
						func: functionList["localReactivateGroup"],
					},
				];
		case "401-message":
			return [
				{
					type: "info",
					placeholder: "You do not have the rights to complete that action",
				},
			];
		default:
			return [
				{
					label: "This is a test. You shouldn't see this",
					type: "label",
					placeholder: "",
					link: "",
				},
			];
	}
};