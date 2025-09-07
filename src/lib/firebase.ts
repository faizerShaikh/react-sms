import { initializeApp } from 'firebase/app';

import { getMessaging } from 'firebase/messaging';

//Firebase Config values imported from .env file
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY!,
  authDomain: import.meta.env.VITE_AUTHDOMAIN!,
  databaseURL: import.meta.env.VITE_DATABASEURL!,
  projectId: import.meta.env.VITE_PROJECTID!,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET!,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID!,
  appId: import.meta.env.VITE_APPID!,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Messaging service
export const messaging = getMessaging(app);
