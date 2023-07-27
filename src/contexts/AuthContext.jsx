import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import {updateProfile} from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  async function signup(email, password, name) {
    // auth.currentUser({displayName:name})
   
    await createUserWithEmailAndPassword(auth, email, password).then(
      
    )
    await updateProfile(auth.currentUser, {
      displayName: name})
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = { currentUser, signup, login, resetPassword, logout };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
