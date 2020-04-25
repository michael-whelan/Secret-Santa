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
			const { person_id } = action.data;
			console.log(action.data);
			let people = state.people.map((peep) => {
				if (peep.id === person_id) {
					peep.name = action.data.name;
					peep.email = action.data.email;
				}
				return peep;
			});
			return { ...state, people: people };
		default:
			return state;
	}
}
