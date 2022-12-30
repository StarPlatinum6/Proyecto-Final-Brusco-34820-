import React from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { setLocale } from "yup";

import Btn from "../Btn/Btn";

setLocale({
  number: {
    default: "Deve ser maior que",
  },
});

const ValidationSchema = yup.object().shape({
  firstName: yup.string().required("*Obligatorio"),
  lastName: yup.string().required("*Obligatorio"),
  phone: yup
    .number()
    .positive("*Positivo")
    .integer("*Entero")
    .required("*Obligatorio"),
});

export const CartForm = ({ onSubmit, onClose }) => {
  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", phone: "" }}
      validationSchema={ValidationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form className="form">
          <div className="flex justify-center items-center relative">
            <Field
              name="firstName"
              placeholder="Nombre completo"
              className="p-2 m-2 text-center text-lg font-serif font-thin border-indigo-500 border-4 rounded-lg border-solid"
            />
            {errors.firstName && touched.firstName ? (
              <div className="absolute ml-80 font-sans font-light text-sm text-red-600">
                {errors.firstName}
              </div>
            ) : null}
          </div>
          <div className="flex justify-center items-center">
            <Field
              name="lastName"
              placeholder="Apellido"
              className="p-2 m-2 text-center text-lg font-serif font-thin border-indigo-500 border-4 rounded-lg border-solid"
            />
            {errors.lastName && touched.lastName ? (
              <div className="absolute ml-80 font-sans font-light text-sm text-red-600">
                {errors.lastName}
              </div>
            ) : null}
          </div>
          <div className="flex justify-center items-center">
            <Field
              name="phone"
              placeholder="Número de teléfono"
              className="p-2 m-2 text-center text-lg font-serif font-thin border-indigo-500 border-4 rounded-lg border-solid"
            />
            {errors.phone && touched.phone ? (
              <div className="absolute ml-80 font-sans font-light text-sm text-red-600">
                {errors.phone}
              </div>
            ) : null}
          </div>

          <div className="p-4">
            <Btn
              className="bg-red-600 p-2 rounded-md m-1 font-light hover:bg-red-700 transition-all w-28 sm:w-40 shadow-md shadow-red-700 text-slate-50 text-lg mr-3 sm:mr-6"
              fn={onClose}
              type={"button"}
            >
              Cancelar
            </Btn>
            <Btn
              className="bg-green-600 p-2 rounded-md m-1 font-light hover:bg-green-700 transition-all w-28 sm:w-40 shadow-md shadow-green-700 text-slate-50 text-lg ml-3 sm:ml-6"
              type={"submit"}
            >
              Comprar
            </Btn>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CartForm;
