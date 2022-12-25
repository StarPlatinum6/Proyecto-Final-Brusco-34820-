import OrderCheck from "../OrderCheck/OrderCheck";

const Footer = () => {
  return (
    <>
      <div className="h-40 flex items-center justify-center bg-slate-100 sm:text-lg md:text-2xl px-2">
        <span className="animate-pulse text-slate-600 pr-1">
          Diseñado en React.JS
        </span>
        <img
          src="https://www.svgrepo.com/show/372933/react.svg"
          className="animate-pulse w-10 md:w-12 drop-shadow-2xl contrast-50"
          alt=""
        ></img>
        <span className="animate-pulse text-slate-600 pl-1">
          por Nicolás Brusco para la comisión 34820
        </span>
      </div>
      <OrderCheck />
    </>
  );
};

export default Footer;
