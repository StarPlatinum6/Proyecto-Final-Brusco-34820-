import { useState, useEffect, useContext } from "react";

import { Formik, Form, Field } from "formik";
import * as yup from "yup";

import { AuthContext } from "../../context/AuthContext";

import Loading from "../Loading/Loading";
import Btn from "../Btn/Btn";
import SignUpIcon from "../NavBar/NavIcons/SignUpIcon";

const ValidationSchema = yup.object().shape({
  fullName: yup.string().required("*Obligatorio"),
  photoURL: yup.string(),
  email: yup.string().required("*Obligatorio").email("*El email no es válido"),
  password: yup
    .string()
    .required("*Obligatorio")
    .min(8, "*Muy corta")
    .max(32, "*Muy larga")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, //eslint-disable-line
      "*Muy débil"
    ),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "*No coinciden"),
});

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(true);
  const { signUp } = useContext(AuthContext);

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
        <div className="w-full max-w-md space-y-8">
          <div className="mx-auto h-12 w-12 flex justify-center items-center">
            <SignUpIcon height="3em" width="3em" fill="#4F46E5" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-serif tracking-tight text-gray-900">
            Registra tu cuenta
          </h2>
        </div>
      </div>
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          photoURL: "",
          password: "",
        }}
        validationSchema={ValidationSchema}
        onSubmit={signUp}
      >
        {({ errors, touched }) => (
          <Form className="-mt-4 w-2/5 m-auto">
            <div className="-space-y-px rounded-md shadow-sm">
              <div className="flex justify-center items-center relative -space-y-px rounded-md shadow-sm">
                <Field
                  name="fullName"
                  placeholder="Nombre completo"
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-xs sm:text-sm"
                />
                {errors.fullName && touched.fullName ? (
                  <div className="absolute -right-28 sm:-right-28 mr-2 font-sans font-light text-xs sm:text-sm text-red-600 w-28 z-50">
                    {errors.fullName}
                  </div>
                ) : null}
              </div>
              <div className="flex justify-center items-center relative">
                <Field
                  name="email"
                  placeholder="Correo electrónico"
                  className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-xs sm:text-sm"
                />
                {errors.email && touched.email ? (
                  <div className="absolute -right-28 sm:-right-28 mr-2 font-sans font-light text-xs sm:text-sm text-red-600 w-28 z-50">
                    {errors.email}
                  </div>
                ) : null}
              </div>
              <div className="flex justify-center items-center relative">
                <Field
                  name="photoURL"
                  placeholder="URL para foto perfil"
                  className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-xs sm:text-sm"
                />
                {errors.photoURL && touched.photoURL ? (
                  <div className="absolute -right-28 sm:-right-28 mr-2 font-sans font-light text-xs sm:text-sm text-red-600 w-28 z-50">
                    {errors.photoURL}
                  </div>
                ) : null}
              </div>
              <div className="flex justify-center items-center relative">
                <Field
                  name="password"
                  type="password"
                  placeholder="Contraseña"
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-xs sm:text-sm"
                />
                {errors.password && touched.password ? (
                  <div className="absolute -right-28 sm:-right-28 mr-2 font-sans font-light text-xs sm:text-sm text-red-600 w-28 z-50">
                    {errors.password}
                  </div>
                ) : null}
              </div>
              <div className="flex justify-center items-center relative">
                <Field
                  name="passwordConfirmation"
                  type="password"
                  placeholder="Confirmar contraseña"
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-xs sm:text-sm"
                />
                {errors.passwordConfirmation && touched.passwordConfirmation ? (
                  <div className="absolute -right-28 sm:-right-28 mr-2 font-sans font-light text-xs sm:text-sm text-red-600 w-28 z-50">
                    {errors.passwordConfirmation}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="p-4 flex justify-center mb-8">
              <Btn
                className="group relative flex w-full mt-3 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                type={"submit"}
              >
                Registrarme
              </Btn>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
