import { LOAD_GROUP_ERROR, STORE_SELECTED_GROUP } from "./types";

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
		default:
			return state;
	}
}
