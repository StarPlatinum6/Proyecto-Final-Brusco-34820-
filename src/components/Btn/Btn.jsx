const Btn = ({ fn, className, type, children }) => {
  return (
    <button onClick={fn} className={className} type={type}>
      {children}
    </button>
  );
};

export default Btn;
