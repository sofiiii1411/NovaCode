import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  auth, 
  db, 
  googleProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail, 
  signOut, 
  onAuthStateChanged, 
  updateProfile,
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from '../lib/firebase';
import { UserRole, UserProfile } from '../lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole | null;
  isLoading: boolean;
  isFirebaseActive: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ error?: string }>;
  register: (email: string, password: string, fullName: string) => Promise<{ error?: string; successMessage?: string }>;
  signInWithGoogle: () => Promise<{ error?: string }>;
  resetPassword: (email: string) => Promise<{ error?: string; successMessage?: string }>;
  logout: () => Promise<void>;
  switchDemoRole?: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default seed roles for predefined platform testing
const SPECIAL_ROLES: Record<string, UserRole> = {
  'owner@novacode.io': 'owner',
  'staff@novacode.io': 'staff',
  'customer@novacode.io': 'customer',
};

const LOCAL_STORAGE_KEY = 'novacode_active_session';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFirebaseActive, setIsFirebaseActive] = useState<boolean>(true);

  // Sync Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const email = (firebaseUser.email || '').toLowerCase();
          let userRole: UserRole = SPECIAL_ROLES[email] || 'customer';
          let fullName = firebaseUser.displayName || email.split('@')[0];

          // Attempt to retrieve persistent role from Firestore
          try {
            const userDocRef = doc(db, 'users', firebaseUser.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
              const data = userDoc.data();
              if (data.role) {
                userRole = data.role as UserRole;
              }
              if (data.full_name) {
                fullName = data.full_name;
              }
            } else {
              // Create user record in Firestore if not present
              await setDoc(userDocRef, {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                full_name: fullName,
                role: userRole,
                avatar_url: firebaseUser.photoURL || null,
                createdAt: serverTimestamp(),
              }, { merge: true });
            }
          } catch (firestoreErr) {
            console.warn('Firestore profile lookup note:', firestoreErr);
          }

          const profile: UserProfile = {
            id: firebaseUser.uid,
            email: firebaseUser.email || email,
            role: userRole,
            full_name: fullName,
            avatar_url: firebaseUser.photoURL || undefined,
            created_at: firebaseUser.metadata.creationTime,
          };

          setUser(profile);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
        } else {
          // Check local session fallback if not logged into Firebase
          const savedSession = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (savedSession) {
            try {
              const parsed = JSON.parse(savedSession);
              // Only keep if it was a simulated demo account
              if (parsed && parsed.id?.startsWith('demo_')) {
                setUser(parsed);
              } else {
                setUser(null);
                localStorage.removeItem(LOCAL_STORAGE_KEY);
              }
            } catch {
              setUser(null);
            }
          } else {
            setUser(null);
          }
        }
      } catch (err) {
        console.error('Error handling auth state change:', err);
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string, _rememberMe = true): Promise<{ error?: string }> => {
    setIsLoading(true);
    const cleanEmail = email.trim().toLowerCase();

    try {
      // 1. Attempt Real Firebase Sign-In
      const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, password);
      const fbUser = userCredential.user;

      let userRole: UserRole = SPECIAL_ROLES[cleanEmail] || 'customer';
      let fullName = fbUser.displayName || cleanEmail.split('@')[0];

      try {
        const userDocRef = doc(db, 'users', fbUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists() && userDoc.data().role) {
          userRole = userDoc.data().role as UserRole;
        }
      } catch (e) {
        console.warn('Firestore role retrieval fallback:', e);
      }

      const profile: UserProfile = {
        id: fbUser.uid,
        email: fbUser.email || cleanEmail,
        role: userRole,
        full_name: fullName,
        avatar_url: fbUser.photoURL || undefined,
      };

      setUser(profile);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
      return {};
    } catch (fbErr: any) {
      console.warn('Firebase login attempt:', fbErr.code, fbErr.message);

      // If user enters one of the pre-configured quick demo roles and it hasn't been created yet in Firebase console:
      if (
        (fbErr.code === 'auth/invalid-credential' || 
         fbErr.code === 'auth/user-not-found' || 
         fbErr.code === 'auth/wrong-password') &&
        SPECIAL_ROLES[cleanEmail]
      ) {
        // Allow instant role demonstration
        const demoProfile: UserProfile = {
          id: 'demo_' + Math.random().toString(36).substring(2, 9),
          email: cleanEmail,
          role: SPECIAL_ROLES[cleanEmail],
          full_name: cleanEmail.startsWith('owner') 
            ? 'Alex Vance (Owner & Super Admin)' 
            : cleanEmail.startsWith('staff') 
            ? 'Marcus Chen (Staff Lead)' 
            : 'Sarah Connor (NovaCode Enterprise)',
        };
        setUser(demoProfile);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(demoProfile));
        return {};
      }

      // Friendly Firebase error mapping
      switch (fbErr.code) {
        case 'auth/invalid-credential':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          return { error: 'Invalid email or password. Please verify your credentials or create an account.' };
        case 'auth/invalid-email':
          return { error: 'The email address is improperly formatted.' };
        case 'auth/user-disabled':
          return { error: 'This user account has been disabled.' };
        case 'auth/too-many-requests':
          return { error: 'Too many unsuccessful attempts. Please try again later.' };
        case 'auth/network-request-failed':
          return { error: 'Network error. Please check your internet connection.' };
        default:
          return { error: fbErr.message || 'Authentication failed. Please try again.' };
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, fullName: string): Promise<{ error?: string; successMessage?: string }> => {
    setIsLoading(true);
    const cleanEmail = email.trim().toLowerCase();

    try {
      // 1. Create User in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, cleanEmail, password);
      const fbUser = userCredential.user;

      // 2. Set Display Name
      await updateProfile(fbUser, { displayName: fullName.trim() });

      // 3. Persist strict 'customer' role in Firestore
      try {
        await setDoc(doc(db, 'users', fbUser.uid), {
          uid: fbUser.uid,
          email: cleanEmail,
          full_name: fullName.trim(),
          role: 'customer', // Public registration is ALWAYS Customer
          createdAt: serverTimestamp(),
        });
      } catch (firestoreErr) {
        console.warn('Firestore doc write note:', firestoreErr);
      }

      const profile: UserProfile = {
        id: fbUser.uid,
        email: cleanEmail,
        role: 'customer',
        full_name: fullName.trim(),
      };

      setUser(profile);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));

      return { successMessage: 'NovaCode account created successfully!' };
    } catch (fbErr: any) {
      console.error('Firebase registration error:', fbErr);

      switch (fbErr.code) {
        case 'auth/email-already-in-use':
          return { error: 'An account with this email address already exists. Please sign in instead.' };
        case 'auth/weak-password':
          return { error: 'Password should be at least 6 characters.' };
        case 'auth/invalid-email':
          return { error: 'Please provide a valid email address.' };
        case 'auth/operation-not-allowed':
          return { error: 'Email/Password sign-in is not enabled in your Firebase console. Please enable it in Authentication -> Sign-in method.' };
        default:
          return { error: fbErr.message || 'Registration failed.' };
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async (): Promise<{ error?: string }> => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;
      const cleanEmail = (fbUser.email || '').toLowerCase();

      let userRole: UserRole = SPECIAL_ROLES[cleanEmail] || 'customer';
      let fullName = fbUser.displayName || 'NovaCode Customer';

      // Record profile in Firestore
      try {
        const userDocRef = doc(db, 'users', fbUser.uid);
        const existingDoc = await getDoc(userDocRef);

        if (existingDoc.exists() && existingDoc.data().role) {
          userRole = existingDoc.data().role as UserRole;
        } else {
          await setDoc(userDocRef, {
            uid: fbUser.uid,
            email: fbUser.email,
            full_name: fullName,
            role: userRole,
            avatar_url: fbUser.photoURL || null,
            createdAt: serverTimestamp(),
          }, { merge: true });
        }
      } catch (firestoreErr) {
        console.warn('Firestore doc creation note:', firestoreErr);
      }

      const profile: UserProfile = {
        id: fbUser.uid,
        email: fbUser.email || cleanEmail,
        role: userRole,
        full_name: fullName,
        avatar_url: fbUser.photoURL || undefined,
      };

      setUser(profile);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
      return {};
    } catch (fbErr: any) {
      console.error('Google Sign-in error:', fbErr);

      if (fbErr.code === 'auth/popup-closed-by-user') {
        return { error: 'Sign in was cancelled.' };
      }
      if (fbErr.code === 'auth/unauthorized-domain') {
        return { 
          error: 'Domain not authorized in Firebase. Please add "localhost" under Firebase Console -> Authentication -> Settings -> Authorized domains.' 
        };
      }
      if (fbErr.code === 'auth/operation-not-allowed') {
        return { 
          error: 'Google Sign-in is not enabled in Firebase Console. Please enable it under Authentication -> Sign-in method.' 
        };
      }
      return { error: fbErr.message || 'Google authentication failed.' };
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string): Promise<{ error?: string; successMessage?: string }> => {
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      return {
        successMessage: 'If an account exists with this email address, password reset instructions have been dispatched.',
      };
    } catch (fbErr: any) {
      console.warn('Password reset note:', fbErr);
      // For security, never disclose whether email exists
      return {
        successMessage: 'If an account exists with this email address, password reset instructions have been dispatched.',
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await signOut(auth);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      sessionStorage.removeItem(LOCAL_STORAGE_KEY);
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const switchDemoRole = (targetRole: UserRole) => {
    if (user) {
      const updated = { ...user, role: targetRole };
      setUser(updated);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isLoading,
        isFirebaseActive,
        login,
        register,
        signInWithGoogle,
        resetPassword,
        logout,
        switchDemoRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
