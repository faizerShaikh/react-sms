import { useState } from "react";
import reactLogo from "./assets/react.svg";
import PWABadge from "./PWABadge.tsx";
import PWAInstallPrompt from "./components/PWAInstallPrompt.tsx";
import OfflinePage from "./components/OfflinePage.tsx";
import PWAStatus from "./components/PWAStatus.tsx";
import PWARedirectHandler from "./components/PWARedirectHandler.tsx";
import { pwaRedirect } from "./lib/pwa";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href='https://vite.dev' target='_blank'>
          <img src={"/favicon.svg"} className='logo' alt='sms-react logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>sms-react</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
      
      {/* Test buttons for PWA functionality */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button 
          onClick={() => pwaRedirect.markAsInstalled()}
          style={{ margin: '5px', padding: '8px 16px', background: '#004ab0', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Mark PWA as Installed
        </button>
        <button 
          onClick={() => pwaRedirect.triggerRedirectPrompt()}
          style={{ margin: '5px', padding: '8px 16px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Test Redirect Prompt
        </button>
        <button 
          onClick={() => pwaRedirect.resetRedirectState()}
          style={{ margin: '5px', padding: '8px 16px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Reset Redirect State
        </button>
      </div>
      
      <PWABadge />
      <PWAInstallPrompt />
      <OfflinePage />
      <PWAStatus />
      <PWARedirectHandler />
    </>
  );
}

export default App;
