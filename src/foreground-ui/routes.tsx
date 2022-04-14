import { RouteObject, useRoutes } from "react-router-dom";
import Home from "./components/home";

export const appRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
];

export const AppRoutes = () => {
  const routes = useRoutes(appRoutes);
  return <main>{routes}</main>;
};

export default AppRoutes;
