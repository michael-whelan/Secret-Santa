import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import toDoApp from "./store/Sidebar/reducers";
import App from "./App";
import { loadGroupList } from "./store/Sidebar/actions";
import rootSaga from "./sagas";
import { BrowserRouter } from "react-router-dom";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(toDoApp, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

store.dispatch(loadGroupList());

render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
