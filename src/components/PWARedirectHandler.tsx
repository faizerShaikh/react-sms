import { useEffect, useState } from 'react';
import { pwaRedirect } from '../lib/pwa';
import './PWARedirectHandler.css';

export default function PWARedirectHandler() {
  const [showRedirectPrompt, setShowRedirectPrompt] = useState(false);
  const [isPWAInstalled, setIsPWAInstalled] = useState(false);

  useEffect(() => {
    // Check if PWA is installed and should redirect
    const checkRedirect = async () => {
      try {
        // Wait a bit for the app to fully load
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Check if we should show redirect prompt
        const shouldRedirect = await pwaRedirect.checkAndRedirect();
        
        if (shouldRedirect) {
          setShowRedirectPrompt(true);
          setIsPWAInstalled(true);
        }
      } catch (error) {
        console.log('PWA redirect check failed:', error);
      }
    };

    checkRedirect();

    // Listen for custom events
    const handleShowInstall = () => {
      // This will be handled by the PWAInstallPrompt component
      console.log('Show PWA install prompt');
    };

    window.addEventListener('showPWAInstall', handleShowInstall);

    return () => {
      window.removeEventListener('showPWAInstall', handleShowInstall);
    };
  }, []);

  const handleOpenApp = () => {
    setShowRedirectPrompt(false);
    
    // Platform-specific handling
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    
    if (isIOS) {
      // For iOS, provide clear instructions
      alert(
        'To open the School Management System app:\n\n' +
        '1. Go to your Home Screen\n' +
        '2. Look for the "SMS" app icon\n' +
        '3. Tap the icon to open the app\n\n' +
        'The app should be available on your Home Screen if you previously added it.'
      );
    } else {
      // For other platforms, use the redirect utility
      pwaRedirect.redirectToPWA();
    }
  };

  const handleContinueInBrowser = () => {
    setShowRedirectPrompt(false);
    // Remember user's choice
    localStorage.setItem('pwa-redirect-dismissed', 'true');
  };

  if (!showRedirectPrompt || !isPWAInstalled) {
    return null;
  }

  return (
    <div className="pwa-redirect-overlay">
      <div className="pwa-redirect-modal">
        <div className="pwa-redirect-header">
          <div className="pwa-redirect-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
            </svg>
          </div>
          <h2>Open in App</h2>
          <p>You have the School Management System app installed. Would you like to open it instead?</p>
        </div>
        
        <div className="pwa-redirect-actions">
          <button 
            className="pwa-redirect-button primary"
            onClick={handleOpenApp}
          >
            Open App
          </button>
          <button 
            className="pwa-redirect-button secondary"
            onClick={handleContinueInBrowser}
          >
            Continue in Browser
          </button>
        </div>
        
        <div className="pwa-redirect-footer">
          <small>You can change this preference later in settings</small>
        </div>
      </div>
    </div>
  );
}
