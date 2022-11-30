const CartWidget = (props) => {
  return (
    <button onClick={props.fn} className={props.className}>
      <img src={"./images/cart2.svg"} alt="img-cart" />
      <span>3</span>
    </button>
  );
};

export default CartWidget;
