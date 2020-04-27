import { LOAD_GROUP_ERROR, STORE_SELECTED_GROUP } from "./types";
import { UPDATE_PERSON, UPDATE_PERSON_ERROR } from "../Modal/types";

const initialState = {
	people: [],
	errorMsg: "",
};

export default function ActiveGroupReducer(state = initialState, action) {
	switch (action.type) {
		case LOAD_GROUP_ERROR:
			return {
				...state,
				people: [],
				errorMsg: "Error Loading Group Info",
			};
		case STORE_SELECTED_GROUP:
			return { ...state, people: action.people };
		case UPDATE_PERSON:
			const { person_id } = action.data;
			let people = state.people.map((peep) => {
				if (peep.id === person_id) {
					peep.name = action.data.name;
					peep.email = action.data.email;
				}
				return peep;
			});
			return { ...state, people: people };
		case UPDATE_PERSON_ERROR:
			console.log("Error during update");
			console.log(action.data);
			return state;
		case "DO_TEST":
			console.log("test");
			console.log(action.data);
			return state;
		default:
			return state;
	}
}
