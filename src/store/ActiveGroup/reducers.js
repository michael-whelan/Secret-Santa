import {
	LOAD_GROUP_ERROR,
	STORE_SELECTED_GROUP,
	CLEAR_SELECTED_GROUP,
} from "./types";
import {
	UPDATE_PERSON,
	UPDATE_PERSON_ERROR,
	ADD_PERSON,
	DELETE_PERSON,
} from "../Modal/types";

const initialState = {
	people: [],
	errorMsg: "",
};

const notsToArray = (people) => {
	people.forEach((person) => {
		if (person.nots) {
			person.nots = person.nots.split("|").filter((item) => item !== "");
		} else {
			person.nots = [];
		}
	});
};

export default function ActiveGroupReducer(
	state = initialState,
	{ type, data }
) {
	switch (type) {
		case LOAD_GROUP_ERROR:
			return {
				...state,
				people: [],
				errorMsg: "Error Loading Group Info",
			};
		case STORE_SELECTED_GROUP:
			const { group_id, ugid, group_name, sent } = data;
			data.people && notsToArray(data.people);
			return {
				...state,
				people: data.people,
				group_id: group_id,
				ugid: ugid,
				group_name: group_name,
				public_group: data.public,
				sent: sent,
			};
		case UPDATE_PERSON:
			const { person_id } = data;
			let people = state.people.map((peep) => {
				if (peep.person_id === person_id) {
					peep.name = data.name;
					peep.email = data.email;
				}
				return peep;
			});
			return { ...state, people: people };
		case UPDATE_PERSON_ERROR:
			console.log("Error during update");
			console.log(data);
			return state;
		case ADD_PERSON:
			return state;
		case DELETE_PERSON:
			console.log("Person Deleted");
			return state;
		case CLEAR_SELECTED_GROUP:
			return initialState;
		case "DO_TEST":
			console.log("test", data);
			return state;
		default:
			return state;
	}
}
