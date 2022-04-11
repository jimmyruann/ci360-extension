import { RouteObject } from "react-router-dom";
import Home from "./components/home";
import Second from "./components/second";

export const appRoutes: RouteObject[] = [
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/second",
		element: <Second />,
	},
];
