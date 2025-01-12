import "@mantine/carousel/styles.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "mantine-react-table/styles.css";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";
import { AuthProvider } from "./features/auth/components/AuthProvider.tsx";
import "./index.css";
import { theme } from "./libs/theme.ts";
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <MantineProvider theme={theme}>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  </MantineProvider>
);
