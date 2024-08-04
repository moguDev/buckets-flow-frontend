import {
  initializeApp,
  getApps,
  getApp,
  FirebaseOptions,
  FirebaseApp,
} from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

export const config: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_AMESUREMENT_ID,
};

export const getFirebaseApp = (): FirebaseApp => {
  return !getApps().length ? initializeApp(config) : getApp();
};

export const getRealtimeDb = () => {
  const app = getFirebaseApp();
  return getDatabase(app);
};

export const getFirebaseAuth = () => {
  const app = getFirebaseApp();
  return getAuth(app);
};
