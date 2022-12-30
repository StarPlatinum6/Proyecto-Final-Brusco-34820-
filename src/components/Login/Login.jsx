import { NavLink } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

import { AuthContext } from "../../context/AuthContext";

import { Formik, Form, Field } from "formik";

import Loading from "../Loading/Loading";

import { LockClosedIcon } from "@heroicons/react/20/solid";
import SignInIcon from "../NavBar/NavIcons/LoginIcon";
import GoogleIcon from "./GoogleIcon";
import GithubIcon from "./GithubIcon";

export default function Login() {
  const { login, googleLogin, githubLogin } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center pt-12 pb-6">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-4">
          <div className="mb-8">
            <div className="mx-auto h-12 w-12 flex justify-center items-center">
              <SignInIcon height="3em" width="3em" fill="#4F46E5" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-serif tracking-tight text-gray-900">
              Ingresa a tu cuenta
            </h2>
            <NavLink to="/signup">
              <p className="mt-2 text-center text-sm text-gray-600">
                O{" "}
                <span className="font-medium text-indigo-600 hover:text-indigo-500">
                  regístrate con un nuevo usuario
                </span>
              </p>
            </NavLink>
          </div>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={login}
          >
            <Form className="mt-8 space-y-6">
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Correo electrónico
                  </label>
                  <Field
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-sm sm:text-base"
                    placeholder="Correo electrónico"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Contraseña
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-sm sm:text-base"
                    placeholder="Contraseña"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Field
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Recordarme
                  </label>
                </div>

                <div className="text-sm">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  onSubmit={() => login()}
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 mb-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-indigo-400 group-hover:text-indigo-300"
                      aria-hidden="true"
                    />
                  </span>
                  Ingresar
                </button>
              </div>
            </Form>
          </Formik>
          <button
            onClick={() => googleLogin()}
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <GoogleIcon
                className="h-5 w-5 text-blue-400 group-hover:text-blue-300"
                aria-hidden="true"
              />
            </span>
            Ingresar con Google
          </button>
          <button
            onClick={() => githubLogin()}
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-slate-600 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <GithubIcon
                className="h-5 w-5 text-slate-400 group-hover:text-slate-300"
                aria-hidden="true"
              />
            </span>
            Ingresar con Github
          </button>
        </div>
      </div>
    </>
  );
}
