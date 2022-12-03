const CartWidget = (props) => {
  return (
    <button onClick={props.fn} className={props.className}>
      <img
        src={"/images/cart2.svg"}
        alt="img-cart"
        className="w-12 px-1 py-1"
      />
      {/* <span>3</span> */}
    </button>
  );
};

export default CartWidget;
