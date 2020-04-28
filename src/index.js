import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { loadGroupList } from "./store/Sidebar/actions";
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
//<a target="_blank" href="https://icons8.com/icons/set/edit-file">Edit File icon</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>