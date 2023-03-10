import React from "react";
import ReactDOM from "react-dom";
import {  UserProvider,  FiltersProvider } from "context";
import Home from "./pages/Home";
import "styles/global.scss";

ReactDOM.render(
	<React.StrictMode>
		<FiltersProvider>
			<UserProvider>
				<Home />
			</UserProvider>
		</FiltersProvider>
	</React.StrictMode>,
	document.getElementById("app")
);
