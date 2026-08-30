import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase web config for the 1313 Fashion project.
// These values are safe to expose in client code — Firebase web config is
// not a secret. Real protection comes from Firestore Security Rules
// (see firestore.rules) + Firebase Authentication, not from hiding these.
const firebaseConfig = {
  apiKey: "AIzaSyBuflQpSP8L7NEJ2gq654cIkDwNDySFw1E",
  authDomain: "fashion-f19ab.firebaseapp.com",
  projectId: "fashion-f19ab",
  storageBucket: "fashion-f19ab.firebasestorage.app",
  messagingSenderId: "973567493942",
  appId: "1:973567493942:web:c681bb0f74e3069aa75597",
  measurementId: "G-55R724SR1J",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

