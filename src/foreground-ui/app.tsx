import { Modal, ScrollArea } from "@mantine/core";
import { useState } from "react";
import { useRoutes } from "react-router-dom";
import { appRoutes } from "./routes";

export const App = () => {
	const [opened, setOpened] = useState(false);
	const routes = useRoutes(appRoutes);

	return (
		<Modal centered closeOnClickOutside={false} closeOnEscape={false} opened={opened} onClose={() => setOpened(false)} size={600} zIndex={2147483647}>
			<ScrollArea style={{ height: 500 }}>
				<main>{routes}</main>
			</ScrollArea>
		</Modal>
	);
};

export default App;
