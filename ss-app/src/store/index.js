import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

// Import Reducers

const rootReducer = combineReducers({
	// currentItem: currentItemReducer,
	// hierarchy: hierarchyReducer,
	// user: userReducer,
	// filters: filtersReducer,
});

export default function configureStore(preloadedState) {
	const enhancers = [middlewareEnhancer];
	const composedEnhancers = composeWithDevTools(...enhancers);
	const store = createStore(rootReducer, preloadedState, composedEnhancers);
	return store;
}
