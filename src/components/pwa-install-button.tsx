import { useAuth } from '@/context/auth-context';
import { cn } from '@/lib/utils';
import { Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { MobileResponsiveDialog } from './mobile-responsive-dialog';
import { Button } from './ui';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const PWAInstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const {
    state: { isLoggedIn },
  } = useAuth();

  useEffect(() => {
    // Check if already installed as PWA
    const checkStandalone = () => {
      const standalone = window.matchMedia(
        '(display-mode: standalone)',
      ).matches;
      setIsStandalone(standalone);

      // Check if iOS
      const userAgent = navigator.userAgent.toLowerCase();
      const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
      setIsIOS(isIOSDevice);

      // Show install button if not standalone and not iOS (for Android)
      if (!standalone && !isIOSDevice) {
        setShowInstallButton(true);
      }

      // Show install button for iOS if not standalone
      if (!standalone && isIOSDevice) {
        setShowInstallButton(true);
      }
    };

    checkStandalone();

    // Listen for beforeinstallprompt event (Android)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallButton(true);
    };

    // Listen for appinstalled event
    const handleAppInstalled = () => {
      setShowInstallButton(false);
      setDeferredPrompt(null);
      console.log('PWA was installed');
    };

    // Listen for display mode changes
    const handleDisplayModeChange = () => {
      checkStandalone();
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window
      .matchMedia('(display-mode: standalone)')
      .addEventListener('change', handleDisplayModeChange);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
      window.removeEventListener('appinstalled', handleAppInstalled);
      window
        .matchMedia('(display-mode: standalone)')
        .removeEventListener('change', handleDisplayModeChange);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      // Show iOS instructions
      setShowInstructions(true);
      // Store timestamp for iOS install attempt
      localStorage.setItem('ios-install-attempt', Date.now().toString());
    } else if (deferredPrompt) {
      // Android installation
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
        setShowInstallButton(false);
      } else {
        console.log('User dismissed the install prompt');
      }

      setDeferredPrompt(null);
    }
  };

  const handleCloseInstructions = () => {
    setShowInstructions(false);
  };

  // Don't show if already installed or if no install prompt available
  if (isStandalone || (!showInstallButton && !isIOS)) {
    return null;
  }

  return (
    <>
      {/* Floating Install Button */}
      <button
        onClick={handleInstallClick}
        className={cn(
          'fixed bottom-6 right-6 bg-gray-200 text-gray-600 hover:bg-gray-300 rounded-full p-4 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 z-[100] cursor-pointer shadow-2xl',
          {
            'bottom-22': isLoggedIn,
          },
        )}
        title='Install School Management System'
        aria-label='Install School Management System'
      >
        <Download size={24} />
      </button>

      {/* Instructions Dialog */}
      <MobileResponsiveDialog
        heading='Install School Management System'
        onClose={handleCloseInstructions}
        autoOpen={showInstructions}
      >
        {({ onClose }) => (
          <div className='p-5 flex justify-center items-center flex-col gap-4'>
            <div className='flex justify-center items-center rounded-full text-5xl p-8 bg-blue-50 text-blue-600'>
              <Download size={32} />
            </div>

            <p className='text-heading font-medium text-sm font-satoshi text-center'>
              {isIOS
                ? 'To install this app on your iPhone or iPad:'
                : 'Click the install button to add this app to your home screen'}
            </p>

            {isIOS ? (
              <div className='space-y-3 w-full'>
                <div className='flex items-start space-x-3'>
                  <span className='bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5'>
                    1
                  </span>
                  <p className='text-gray-700 text-sm'>
                    Tap the <strong>Share</strong> button{' '}
                    <span className='text-blue-600'>⎋</span> in your browser
                  </p>
                </div>

                <div className='flex items-start space-x-3'>
                  <span className='bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5'>
                    2
                  </span>
                  <p className='text-gray-700 text-sm'>
                    Scroll down and tap <strong>"Add to Home Screen"</strong>
                  </p>
                </div>

                <div className='flex items-start space-x-3'>
                  <span className='bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5'>
                    3
                  </span>
                  <p className='text-gray-700 text-sm'>
                    Tap <strong>"Add"</strong> to confirm
                  </p>
                </div>
              </div>
            ) : (
              <div className='w-full text-center'>
                <p className='text-gray-600 text-sm'>
                  The install prompt will appear automatically when you click
                  the floating button.
                </p>
              </div>
            )}

            <div className='bg-blue-50 border border-blue-200 rounded-lg p-3 w-full'>
              <p className='text-sm text-blue-800'>
                💡 <strong>Tip:</strong> Once installed, you can access the app
                directly from your home screen like any other app!
              </p>
            </div>

            <div className='flex gap-4 justify-end items-center md:flex-row flex-col w-full'>
              <Button
                type='button'
                variant='primary-contained'
                className='font-normal rounded-md'
                size='large'
                onClick={onClose}
              >
                Got it!
              </Button>
            </div>
          </div>
        )}
      </MobileResponsiveDialog>
    </>
  );
};
