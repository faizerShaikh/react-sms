import { useState, useEffect } from "react";
import "./OfflinePage.css";

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline) {
    return null;
  }

  return (
    <div className='offline-page'>
      <div className='offline-content'>
        <div className='offline-icon'>
          <svg
            width='64'
            height='64'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
              fill='currentColor'
            />
          </svg>
        </div>
        <h2>You're Offline</h2>
        <p>Please check your internet connection and try again.</p>
        <p className='offline-note'>
          Some features may be limited while offline, but you can still access
          cached content.
        </p>
        <button
          className='retry-button'
          onClick={() => window.location.reload()}
        >
          Retry Connection
        </button>
      </div>
    </div>
  );
}
