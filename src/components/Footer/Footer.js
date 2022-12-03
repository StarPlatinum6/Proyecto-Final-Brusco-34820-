const Footer = () => {
  return (
    <div className=" h-40 flex items-center justify-center bg-slate-500 text-2xl">
      <span className="animate-pulse text-slate-200 pr-1">
        Diseñado en React.JS
      </span>
      <img src="/images/react.svg" className="animate-pulse w-12" alt=""></img>
      <span className="animate-pulse text-slate-200 pl-1">
        por Nicolás Brusco para la comisión 34820
      </span>
    </div>
  );
};

export default Footer;
