// components/FirebaseMessaging.tsx
'use client';

import { api } from '@/configs/axios';
import { useAuth } from '@/context/auth-context';
import { useFirebaseMessaging } from '@/hooks/useFirebaseMessaging';
import { messaging } from '@/lib/firebase';
import { onMessage } from 'firebase/messaging';
import { useEffect } from 'react';
import { toast } from 'sonner';

interface Props {}

export function FirebaseMessaging({}: Props) {
  const {
    state: { isLoggedIn },
  } = useAuth();
  const { token, error } = useFirebaseMessaging();

  // Log errors for debugging
  useEffect(() => {
    if (error) {
      console.error('Firebase Messaging Error:', error);
    }
  }, [error]);

  // only try to save if we have both a token and the user is logged in
  useEffect(() => {
    if (!token || !isLoggedIn) return;

    console.log('Saving FCM token to backend:', token);
    api
      .post('/app/notifications/update-token/', { token })
      .then((resp) => console.log('FCM token saved successfully:', resp.data))
      .catch((err) => console.error('Error saving FCM token:', err));
  }, [token, isLoggedIn]);

  // foreground handler
  useEffect(() => {
    const unsub = onMessage(messaging, (payload: any) => {
      console.log('FCM foreground message received:', payload);

      // Show notification in foreground if needed
      if (payload.notification) {
        const { title, body } = payload.notification;
        if (title && body) {
          toast.info(title, {
            description: body,
          });
        }
      }
    });
    return unsub;
  }, []);

  return null;
}
