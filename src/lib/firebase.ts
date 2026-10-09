import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

// NovaCode Firebase Configuration provided by user
export const firebaseConfig = {
  apiKey: "AIzaSyDDSUcs-UyNS-3lCplbdCbugPWIgSfCNZI",
  authDomain: "novacode-2de9f.firebaseapp.com",
  projectId: "novacode-2de9f",
  storageBucket: "novacode-2de9f.firebasestorage.app",
  messagingSenderId: "274748861609",
  appId: "1:274748861609:web:0276d01d61325027148db8",
  measurementId: "G-1WZFG2NSEN"
};

// Initialize Firebase App
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Auth & Database Services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Google OAuth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Analytics (Safe conditional load)
export let analytics: any = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch((err) => {
    console.warn('Analytics not supported in this environment', err);
  });
}

export {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  updateProfile,
  doc,
  setDoc,
  getDoc,
  serverTimestamp
};

export default app;
