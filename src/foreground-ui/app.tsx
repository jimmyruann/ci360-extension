import { Modal, ScrollArea } from "@mantine/core";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter, useRoutes } from "react-router-dom";
import AppRoutes, { appRoutes } from "./routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchInterval: false,
      refetchOnMount: false,
      refetchIntervalInBackground: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const App = () => {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    let unmounted = false;
    chrome.runtime.onMessage.addListener(
      (request: { key: string; value: boolean }) => {
        if (request.key === "SET_MODAL_OPEN_STATE") {
          setOpened(request.value);
        }
      }
    );
    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Modal
        centered
        closeOnClickOutside={false}
        closeOnEscape={false}
        opened={opened}
        onClose={() => setOpened(false)}
        size={600}
        zIndex={2147483647}
      >
        <ScrollArea style={{ height: 500 }}>
          <MemoryRouter>
            <AppRoutes />
          </MemoryRouter>
        </ScrollArea>
      </Modal>
    </QueryClientProvider>
  );
};

export default App;
