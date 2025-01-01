import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "./index.css";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { theme } from "./libs/theme.ts";
import { AuthProvider } from "./features/auth/components/AuthProvider.tsx";
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </MantineProvider>
  </StrictMode>
);
