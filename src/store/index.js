import { createStore, combineReducers, applyMiddleware, compose } from "redux";

// Import Reducers
import sidebarReducer from "./Sidebar/reducers";
import ActiveGroupReducer from "./ActiveGroup/reducers";
import authReducer from "./Auth/reducers";
// Import Middleware
import thunk from "redux-thunk";

const rootReducer = combineReducers({
	sidebar: sidebarReducer,
	activeGroup: ActiveGroupReducer,
	auth: authReducer,
});


export default function configureStore(preloadedState) {
	const middleware = [thunk];
	const middlewareEnhancer = applyMiddleware(...middleware);

	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	const enhancer = composeEnhancers(middlewareEnhancer);

	const store = createStore(rootReducer, preloadedState, enhancer);
	return store;
}
