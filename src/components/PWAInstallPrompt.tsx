import { useState, useEffect } from "react";
import { pwaInstaller } from "../lib/pwa";
import "./PWAInstallPrompt.css";

export default function PWAInstallPrompt() {
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      setIsStandalone(pwaInstaller.isRunningAsApp());
      setIsIOS(pwaInstaller.isIOSDevice());
      setShowInstallButton(pwaInstaller.canInstall());
    };

    checkStatus();

    // Check status periodically
    const interval = setInterval(checkStatus, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleInstallClick = async () => {
    const success = await pwaInstaller.install();
    if (success) {
      console.log("PWA installation successful");
      setShowInstallButton(false);
    }
  };

  const handleIOSInstall = () => {
    pwaInstaller.showIOSInstallInstructions();
  };

  // Don't show if already installed or if no install prompt
  if (isStandalone || (!showInstallButton && !isIOS)) {
    return null;
  }

  return (
    <div className='pwa-install-prompt'>
      <div className='pwa-install-content'>
        <div className='pwa-install-text'>
          <h3>Install School Management System</h3>
          <p>Get quick access to your school portal with our app</p>
        </div>
        <div className='pwa-install-buttons'>
          {showInstallButton && (
            <button
              className='pwa-install-button primary'
              onClick={handleInstallClick}
            >
              Install App
            </button>
          )}
          {isIOS && (
            <button
              className='pwa-install-button secondary'
              onClick={handleIOSInstall}
            >
              How to Install
            </button>
          )}
          <button
            className='pwa-install-button close'
            onClick={() => setShowInstallButton(false)}
          >
            Not Now
          </button>
        </div>
      </div>
    </div>
  );
}
