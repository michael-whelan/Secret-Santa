import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import configureStore from "./store/index";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "./Auth";
import config from "./auth_config.json";
import history from "./history";

const store = configureStore();

const onRedirectCallback = (appState) => {
	history.push(
		appState && appState.targetUrl
			? appState.targetUrl
			: window.location.pathname
	);
};

render(
	<Provider store={store}>
		<BrowserRouter>
			<Auth0Provider
				domain={config.domain}
				client_id={config.clientId}
				redirect_uri={window.location.origin}
				onRedirectCallback={onRedirectCallback}
				responseType={"id_token"}
				sameSite={'none'}
			>
				<App />
			</Auth0Provider>
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
//<a target="_blank" href="https://icons8.com/icons/set/edit-file">Edit File icon</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
