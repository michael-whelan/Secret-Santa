import { createStore, combineReducers, applyMiddleware, compose } from "redux";

// Import Reducers
import sidebarReducer from "./Sidebar/reducers";

// Import Middleware
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
	sidebar: sidebarReducer,
});

export default function configureStore(preloadedState) {
	const sagaMiddleware = createSagaMiddleware();

	const middleware = [sagaMiddleware, thunk];
	const middlewareEnhancer = applyMiddleware(...middleware);

	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	const enhancer = composeEnhancers(middlewareEnhancer);

	const store = createStore(rootReducer, preloadedState, enhancer);
	sagaMiddleware.run(rootSaga);

	return store;
}
