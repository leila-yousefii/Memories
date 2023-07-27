import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore ,  serverTimestamp} from 'firebase/firestore';
import { getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();
const timestamp = serverTimestamp();
const auth = getAuth();


export {db, storage, timestamp,auth};

