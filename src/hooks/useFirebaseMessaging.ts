// hooks/useFirebaseMessaging.ts
'use client';

import { messaging } from '@/lib/firebase';
import { getToken } from 'firebase/messaging';
import { useEffect, useState } from 'react';

export function useFirebaseMessaging() {
  const [token, setToken] = useState<string | null>(null);
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
    }
    console.log('Permission : ', permission);
  }

  useEffect(() => {
    requestPermission();
  }, []);

  return { token };
}
