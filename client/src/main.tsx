import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Register PWA Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Lorem ipsum SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('Lorem ipsum SW registration failed: ', registrationError);
      });
  });
}

createRoot(document.getElementById("root")!).render(<App />);
