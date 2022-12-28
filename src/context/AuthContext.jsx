import { useState, createContext, useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";

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

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { clearList } = useContext(CartContext);
  const goTo = useNavigate();

  const MySwal = withReactContent(Swal);

  const signUp = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(auth.currentUser, {
        displayName: data.fullName,
        photoURL: data.photoURL,
      });

      MySwal.fire({
        title: "Registro exitoso!",
        footer: "A continuación serás dirigido al portal de login.",
        icon: "success",
        showConfirmButton: false,
      });
      setTimeout(() => {
        Swal.close();
        goTo(`/login`);
      }, 2000);
    } catch (er) {
      console.log(er);
      if (er.code === "auth/email-already-in-use") {
        MySwal.fire({
          title: "Hubo un error!",
          footer:
            "El correo electrónico ya está registrado. Intenta registrarte nuevamente.",
          icon: "error",
          showConfirmButton: false,
        });
      } else if (er.code) {
        MySwal.fire({
          title: "Hubo un error!",
          footer: "Por favor, intenta registrarte nuevamente.",
          icon: "error",
          showConfirmButton: false,
        });
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
      MySwal.fire({
        title: `¡Bienvenido ${userCredentials.user.displayName}!`,
        footer: "A continuación serás dirigido al home.",
        icon: "success",
        showConfirmButton: false,
      });
      setTimeout(() => {
        Swal.close();
        goTo(`/`);
      }, 2000);
    } catch (er) {
      console.log(er);
      if (er.code === "auth/user-not-found") {
        MySwal.fire({
          title: "Hubo un error!",
          footer:
            "El correo electrónico ingresado no existe en nuestra base de datos. Intenta nuevamente.",
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        });
      } else if (er.code === "auth/wrong-password") {
        MySwal.fire({
          title: "Hubo un error!",
          footer: "La contraseña es incorrecta, por favor, intenta nuevamente.",
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    }
  };

  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredentials = await signInWithPopup(auth, provider);
      MySwal.fire({
        title: `¡Bienvenido ${userCredentials.user.displayName}!`,
        footer: "A continuación serás dirigido al home.",
        icon: "success",
        showConfirmButton: false,
      });
      setTimeout(() => {
        Swal.close();
        goTo(`/`);
      }, 2000);
    } catch (er) {
      console.log(er);
      if (er.code === "auth/account-exists-with-different-credential") {
        MySwal.fire({
          title: "Hubo un error!",
          footer:
            "El correo electrónico ingresado ya está registrado con otro proveedor. Intenta nuevamente.",
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        MySwal.fire({
          title: "Hubo un error!",
          footer: "Por favor, intenta nuevamente.",
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    }
  };

  const githubLogin = async () => {
    try {
      const provider = new GithubAuthProvider();
      const userCredentials = await signInWithPopup(auth, provider);
      MySwal.fire({
        title: `¡Bienvenido ${userCredentials.user.displayName}!`,
        footer: "A continuación serás dirigido al home.",
        icon: "success",
        showConfirmButton: false,
      });
      setTimeout(() => {
        Swal.close();
        goTo(`/`);
      }, 2000);
    } catch (er) {
      console.log(er);
      if (er.code === "auth/account-exists-with-different-credential") {
        MySwal.fire({
          title: "Hubo un error!",
          footer:
            "El correo electrónico ingresado ya está registrado con otro proveedor. Intenta nuevamente.",
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        MySwal.fire({
          title: "Hubo un error!",
          footer: "Por favor, intenta nuevamente.",
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        });
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
    MySwal.fire({
      title: "¡Hasta pronto!",
      footer: "Vamos a extrañarte",
      padding: "2em",
      color: "#716add",
      backdrop: `
          rgba(0,0,123,0.4)
          url("https://i.ibb.co/ZK5dSsb/nyan-cat.gif")
          left top
          no-repeat
        `,
      showConfirmButton: false,
    });
    setTimeout(() => {
      Swal.close();
      goTo(`/login`);
    }, 2500);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logOut, signUp, googleLogin, githubLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
