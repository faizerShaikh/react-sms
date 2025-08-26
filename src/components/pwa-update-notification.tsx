import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { MobileResponsiveDialog } from "./mobile-responsive-dialog";
import { Button } from "./ui";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";

export const PWAUpdateNotification = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [hasTriggeredUpdate, setHasTriggeredUpdate] = useState(false);
  const {
    state: { isLoggedIn },
  } = useAuth();

  // Don't run update detection in development mode
  if (import.meta.env.DEV) {
    return null;
  }

  useEffect(() => {
    let registration: ServiceWorkerRegistration | null = null;

    const checkForUpdates = async () => {
      if ("serviceWorker" in navigator) {
        try {
          registration =
            (await navigator.serviceWorker.getRegistration()) || null;

          if (registration) {
            // Check for updates
            await registration.update();

            // Listen for new service worker
            registration.addEventListener("updatefound", () => {
              const newWorker = registration!.installing;

              if (newWorker) {
                newWorker.addEventListener("statechange", () => {
                  if (
                    newWorker.state === "installed" &&
                    navigator.serviceWorker.controller &&
                    registration?.waiting // Only show if there's a waiting worker
                  ) {
                    // New service worker is installed and ready
                    setUpdateAvailable(true);
                    setShowUpdateDialog(true);
                  }
                });
              }
            });

            // Listen for controller change (update applied)
            navigator.serviceWorker.addEventListener("controllerchange", () => {
              setUpdateAvailable(false);
              setShowUpdateDialog(false);
              setIsUpdating(false);
              // Only reload if we actually applied an update
              if (hasTriggeredUpdate) {
                setHasTriggeredUpdate(false);
                // Small delay to ensure state is updated
                setTimeout(() => {
                  window.location.reload();
                }, 100);
              }
            });
          }
        } catch (error) {
          console.error("Error checking for updates:", error);
        }
      }
    };

    // Check for updates when component mounts
    checkForUpdates();

    // Check for updates when page becomes visible (user returns to app)
    const handleVisibilityChange = () => {
      if (!document.hidden && registration) {
        checkForUpdates();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleUpdate = async () => {
    setIsUpdating(true);
    setHasTriggeredUpdate(true);

    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration && registration.waiting) {
          // Send message to service worker to skip waiting
          registration.waiting.postMessage({ type: "SKIP_WAITING" });
        }
      } catch (error) {
        console.error("Error applying update:", error);
        setIsUpdating(false);
        setHasTriggeredUpdate(false);
      }
    }
  };

  const handleCloseDialog = () => {
    setShowUpdateDialog(false);
  };

  // Don't show if no update available or if we're in a problematic state
  if (!updateAvailable || hasTriggeredUpdate) {
    return null;
  }

  return (
    <>
      {/* Floating Update Button */}
      <button
        onClick={() => setShowUpdateDialog(true)}
        className={cn(
          "fixed bottom-6 left-6 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 z-[1003] cursor-pointer shadow-2xl",
          {
            "bottom-22": isLoggedIn,
          }
        )}
        title='Update Available'
        aria-label='Update Available'
      >
        <RefreshCw size={24} className={isUpdating ? "animate-spin" : ""} />
      </button>

      {/* Update Dialog */}
      <MobileResponsiveDialog
        heading='Update Available'
        onClose={handleCloseDialog}
        autoOpen={showUpdateDialog}
      >
        {({ onClose }) => (
          <div className='p-5 flex justify-center items-center flex-col gap-4'>
            <div className='flex justify-center items-center rounded-full text-5xl p-8 bg-orange-50 text-orange-600'>
              <RefreshCw
                size={32}
                className={isUpdating ? "animate-spin" : ""}
              />
            </div>

            <p className='text-heading font-medium text-sm font-satoshi text-center'>
              {isUpdating
                ? "Updating your app..."
                : "A new version of School Management System is available!"}
            </p>

            {!isUpdating && (
              <div className='w-full text-center'>
                <p className='text-gray-600 text-sm'>
                  Update to get the latest features and improvements. This will
                  only take a moment.
                </p>
              </div>
            )}

            <div className='bg-orange-50 border border-orange-200 rounded-lg p-3 w-full'>
              <p className='text-sm text-orange-800'>
                💡 <strong>Note:</strong> The app will automatically reload
                after the update is applied.
              </p>
            </div>

            <div className='flex gap-4 justify-end items-center md:flex-row flex-col w-full'>
              {!isUpdating && (
                <Button
                  type='button'
                  variant='outline'
                  className='font-normal rounded-md'
                  size='large'
                  onClick={onClose}
                >
                  Later
                </Button>
              )}
              <Button
                type='button'
                variant='primary-contained'
                className='font-normal rounded-md'
                size='large'
                onClick={isUpdating ? undefined : handleUpdate}
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Update Now"}
              </Button>
            </div>
          </div>
        )}
      </MobileResponsiveDialog>
    </>
  );
};
