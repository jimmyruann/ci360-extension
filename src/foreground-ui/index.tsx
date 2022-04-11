import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import App from "./app";

ReactDOM.render(
	<React.StrictMode>
		<MemoryRouter>
			<App />
		</MemoryRouter>
	</React.StrictMode>,
	document.getElementById("foreground"),
);
