import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

///////////////////////////////
// ItemDetailContainer calls //
///////////////////////////////

export const addToCartZeroSwal = (quantity, unit) => {
  MySwal.fire({
    buttonsStyling: false,
    customClass: {
      confirmButton:
        "bg-indigo-600 p-2 rounded-md m-1 font-light hover:bg-indigo-700 transition-all w-40 shadow-md shadow-indigo-700 text-slate-50 text-lg",
    },
    background: "#F1F5F9",
    icon: "error",
    title: "Oops...",
    text: `Intentaste agregar ${quantity} ${unit} al carrito.`,
    footer: "¡No quieras romper mi programa!",
    confirmButtonText: "Grrr...",
  });
};

export const addToCartSuccessSwal = (quantity, unit, stockProd, unit2) => {
  MySwal.fire({
    buttonsStyling: false,
    customClass: {
      confirmButton:
        "bg-indigo-600 p-2 rounded-md m-1 font-light hover:bg-indigo-700 transition-all w-40 shadow-md shadow-indigo-700 text-slate-50 text-lg",
    },
    background: "#F1F5F9",
    icon: "success",
    title: "¡Productos agregados con éxito!",
    text: `Agregaste ${quantity} ${unit} al carrito. Stock restante: ${
      stockProd - quantity
    } ${unit2}.`,
    confirmButtonText: "¡Entendido!",
  });
};

export const addToCartMoreThanStockSwal = (
  quantity,
  unit,
  stockProd,
  unit3
) => {
  MySwal.fire({
    buttonsStyling: false,
    customClass: {
      confirmButton:
        "bg-indigo-600 p-2 rounded-md m-1 font-light hover:bg-indigo-700 transition-all w-40 shadow-md shadow-indigo-700 text-slate-50 text-lg",
    },
    background: "#F1F5F9",
    icon: "error",
    title: "Tuvimos un problema...",
    text: `Intentaste agregar ${quantity} ${unit} al carrito. Pero nuestro stock restante es de ${stockProd} ${unit3}.`,
    footer: "¡Disculpa las molestias!",
    confirmButtonText: "Grrr...",
  });
};

///////////////////////////////
/////// Checkout calls ////////
///////////////////////////////

export const generatingOrderSwal = () => {
  MySwal.fire({
    title: "Generando orden...",
    icon: "info",
    footer: "¡No te vayas!",
    showConfirmButton: false,
  });
};

export const outOfStockSwal = () => {
  MySwal.fire({
    title: "¡Auch!",
    text: `Nos quedamos sin la cantidad deseada mientras finalizabas la compra!`,
    icon: "error",
    footer: "Por favor, actualizá la página para ver el stock actual.",
    showConfirmButton: false,
  });
};

export const errorSwal = () => {
  MySwal.fire({
    title: "Oops...",
    text: `Ha ocurrido un error, por favor, recarga la página y vuelve a intentarlo.`,
    icon: "error",
    showConfirmButton: false,
  });
};

///////////////////////////////
////// AuthContext calls //////
///////////////////////////////

export const okSignUpSwal = () => {
  MySwal.fire({
    title: "Registro exitoso!",
    footer: "A continuación serás dirigido a Mis Órdenes.",
    icon: "success",
    showConfirmButton: false,
  });
  setTimeout(() => {
    Swal.close();
  }, 2000);
};

export const mailInUseSwal = () => {
  MySwal.fire({
    title: "Hubo un error!",
    footer:
      "El correo electrónico ya está registrado. Intenta registrarte nuevamente.",
    icon: "error",
    showConfirmButton: false,
  });
};

export const mailInUseOtherProvSwal = () => {
  MySwal.fire({
    title: "Hubo un error!",
    footer:
      "El correo electrónico ingresado ya está registrado con otro proveedor. Intenta nuevamente.",
    icon: "error",
    showConfirmButton: false,
    timer: 3000,
  });
};

export const authErrorSwal = () => {
  MySwal.fire({
    title: "Hubo un error!",
    footer: "Por favor, intenta nuevamente.",
    icon: "error",
    showConfirmButton: false,
  });
};

export const okLoginSwal = (userCredentials) => {
  MySwal.fire({
    title: `¡Bienvenido ${userCredentials.user.displayName}!`,
    footer: "A continuación serás dirigido a Mis órdenes",
    icon: "success",
    showConfirmButton: false,
  });
  setTimeout(() => {
    Swal.close();
  }, 2000);
};

export const userNotFoundSwal = () => {
  MySwal.fire({
    title: "Hubo un error!",
    footer:
      "El correo electrónico ingresado no existe en nuestra base de datos. Intenta nuevamente.",
    icon: "error",
    showConfirmButton: false,
    timer: 3000,
  });
};

export const wrongPassSwal = () => {
  MySwal.fire({
    title: "Hubo un error!",
    footer: "La contraseña es incorrecta, por favor, intenta nuevamente.",
    icon: "error",
    showConfirmButton: false,
    timer: 3000,
  });
};

export const goodbyeSwal = () => {
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
  }, 2500);
};
