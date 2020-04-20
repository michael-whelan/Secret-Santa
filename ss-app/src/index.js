import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { loadGroupList } from "./store/sagas/actions";
import configureStore from "./store/index";
import { BrowserRouter } from "react-router-dom";


const store = configureStore();
store.dispatch(loadGroupList());

render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
