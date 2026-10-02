import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import App from "./App";
import Site from "./Site";
import { ADMIN_BASE, isAdminPath } from "./adminBase";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false, staleTime: 15000 } },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {isAdminPath(window.location.pathname) ? (
        <BrowserRouter basename={ADMIN_BASE}>
          <AuthProvider>
            <App />
            <Toaster position="bottom-right" toastOptions={{ style: { fontSize: "14px" } }} />
          </AuthProvider>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Site />
        </BrowserRouter>
      )}
    </QueryClientProvider>
  </React.StrictMode>
);
