import { LOAD_GROUP_ERROR, STORE_SELECTED_GROUP } from "./types";
import { UPDATE_PERSON } from "../Modal/types";

const initialState = {
	people: [],
};

export default function ActiveGroupReducer(state = initialState, action) {
	switch (action.type) {
		case LOAD_GROUP_ERROR:
			return {
				...state,
				activegroup: [],
			};
		case STORE_SELECTED_GROUP:
			return { ...state, people: action.people };
		case UPDATE_PERSON:
			const { person_id } = action.person;
			console.log(state.people);
			// state.map((peep) => {
			// 	if (peep.id === id) {
			// 		peep.name = newName;
			// 	}
			// 	return peep;
			// });

			return state;
		default:
			return state;
	}
}
