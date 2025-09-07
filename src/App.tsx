import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FirebaseMessaging } from './components';
import { PWAInstallButton } from './components/pwa-install-button';
import { PWAUpdateNotification } from './components/pwa-update-notification';
import { Toaster } from './components/ui/sonner';
import { queryClient } from './config';
import { AuthProvider } from './context/auth-context';
import { Router } from './router';
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FirebaseMessaging />
        <Router />
        <PWAUpdateNotification />
      </AuthProvider>
      <PWAInstallButton />
      <Toaster position='top-center' richColors closeButton />

      <ReactQueryDevtools
        initialIsOpen={false}
        position='bottom'
        buttonPosition='bottom-right'
      />
    </QueryClientProvider>
  );
}

export default App;
