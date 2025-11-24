import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'REPLACE',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'REPLACE',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'REPLACE',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;