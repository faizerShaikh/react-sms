import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.tsx';
import './index.css';

// Service worker registration is handled by VitePWA plugin
// No manual registration needed

// Listen for iOS PWA detection
// iOS Safari fires this event when page is loaded in standalone mode
if (window.matchMedia('(display-mode: standalone)').matches) {
  // Running as PWA
  console.log('Running as PWA');
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
        if (timeSinceAttempt < 30000) {
          // Within 30 seconds
          // Ask user if they added the app
          setTimeout(() => {
            localStorage.removeItem('ios-install-attempt');
          }, 1000);
        }
      }
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
