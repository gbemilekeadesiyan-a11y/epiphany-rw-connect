import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/ThemeProvider";

// PWA service worker registration — only outside iframes & preview hosts
const isInIframe = (() => {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
})();
const isPreviewHost =
  window.location.hostname.includes("id-preview--") ||
  window.location.hostname.includes("lovableproject.com");

if (isInIframe || isPreviewHost) {
  // Make sure no stale SW from previous deploys interferes with the editor preview
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then((regs) => regs.forEach((r) => r.unregister()));
  }
} else if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    import("workbox-window")
      .then(({ Workbox }) => {
        const wb = new Workbox("/sw.js");
        wb.register().catch(() => {});
      })
      .catch(() => {});
  });
}

createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <App />
  </ThemeProvider>
);
