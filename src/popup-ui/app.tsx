import { createStyles } from "@mantine/core";
import { useRoutes } from "react-router-dom";
import { appRoutes } from "./routes";

const useStyles = createStyles((theme) => ({
	app: {
		width: 300,
		height: 350,
	},
}));

export const App = () => {
	const { classes } = useStyles();
	const routes = useRoutes(appRoutes);
	return <main className={classes.app}>{routes}</main>;
};

export default App;
