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

if (isAdminPath(window.location.pathname)) {
  // The admin panel is private: keep it out of search results and strip the marketing tags.
  document.title = "VidaCare Admin";
  document.head
    .querySelectorAll('link[rel="canonical"], meta[property^="og:"], meta[name^="twitter:"], script[type="application/ld+json"]')
    .forEach((el) => el.remove());
  const robots = document.head.querySelector('meta[name="robots"]') || document.head.appendChild(document.createElement("meta"));
  robots.setAttribute("name", "robots");
  robots.setAttribute("content", "noindex, nofollow");
  document.getElementById("seo-static")?.remove();
}

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
