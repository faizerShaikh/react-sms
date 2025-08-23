import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { pwaRedirect } from "./lib/pwa";

// Register service worker for PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
        
        // Check for PWA redirect after service worker is ready
        setTimeout(() => {
          pwaRedirect.checkAndRedirect();
        }, 2000); // Wait 2 seconds for app to fully load
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

// Listen for iOS PWA detection
// iOS Safari fires this event when page is loaded in standalone mode
if (window.matchMedia('(display-mode: standalone)').matches) {
  // Running as PWA
  console.log('Running as PWA');
  pwaRedirect.markAsInstalled();
}

// Listen for visibility change to detect when user returns from home screen
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    // Page became visible - could indicate user returned from adding to home screen
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    
    if (isIOS && !window.matchMedia('(display-mode: standalone)').matches) {
      // Check if user might have just added the app
      const lastInstallAttempt = localStorage.getItem('ios-install-attempt');
      if (lastInstallAttempt) {
        const timeSinceAttempt = Date.now() - parseInt(lastInstallAttempt);
        if (timeSinceAttempt < 30000) { // Within 30 seconds
          // Ask user if they added the app
          setTimeout(() => {
            const added = confirm(
              'Did you just add the School Management System to your Home Screen?\n\n' +
              'This helps us provide a better experience.'
            );
            if (added) {
              pwaRedirect.markAsInstalled();
            }
            localStorage.removeItem('ios-install-attempt');
          }, 1000);
        }
      }
    }
  }
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
