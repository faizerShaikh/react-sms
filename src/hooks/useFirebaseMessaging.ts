// hooks/useFirebaseMessaging.ts
'use client';

import { messaging } from '@/lib/firebase';
import { getToken } from 'firebase/messaging';
import { useEffect, useState } from 'react';

export function useFirebaseMessaging() {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  async function requestPermission() {
    //requesting permission using Notification API
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_VAPID_KEY!,
      });

      //We can send token to server
      console.log('Token generated : ', token);
      setToken(token);
    } else if (permission === 'denied') {
      //notifications are blocked
      alert('You denied for the notification');
      setError(new Error('You denied for the notification'));
    }
  }

  useEffect(() => {
    requestPermission();
  }, []);

  return { token, error };
}
