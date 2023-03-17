import { useState, createContext, useContext, useEffect } from "react";

import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../services/firebase/firebaseconfig";

import { CartContext } from "../context/CartContext";

import {
  okSignUpSwal,
  mailInUseSwal,
  authErrorSwal,
  okLoginSwal,
  userNotFoundSwal,
  wrongPassSwal,
  mailInUseOtherProvSwal,
  goodbyeSwal,
} from "../services/sweetalert2/swalCalls";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { clearList } = useContext(CartContext);

  const signUp = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(auth.currentUser, {
        displayName: data.fullName,
        photoURL: data.photoURL,
      });
      okSignUpSwal();
    } catch (er) {
      console.log(er);
      if (er.code === "auth/email-already-in-use") {
        mailInUseSwal();
      } else if (er.code) {
        authErrorSwal();
      }
    }
  };

  const login = async (data) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      okLoginSwal(userCredentials);
    } catch (er) {
      console.log(er);
      if (er.code === "auth/user-not-found") {
        userNotFoundSwal();
      } else if (er.code === "auth/wrong-password") {
        wrongPassSwal();
      } else if (er.code) {
        authErrorSwal();
      }
    }
  };

  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredentials = await signInWithPopup(auth, provider);
      okLoginSwal(userCredentials);
    } catch (er) {
      console.log(er);
      if (er.code === "auth/account-exists-with-different-credential") {
        mailInUseOtherProvSwal();
      } else {
        authErrorSwal();
      }
    }
  };

  const githubLogin = async () => {
    try {
      const provider = new GithubAuthProvider();
      const userCredentials = await signInWithPopup(auth, provider);
      okLoginSwal(userCredentials);
    } catch (er) {
      console.log(er);
      if (er.code === "auth/account-exists-with-different-credential") {
        mailInUseOtherProvSwal();
      } else {
        authErrorSwal();
      }
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser();
      }
    });
  }, []);

  const logOut = async () => {
    await signOut(auth);
    clearList();
    goodbyeSwal();
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logOut, signUp, googleLogin, githubLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
