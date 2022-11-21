import './CartWidget.css'

const CartWidget = (props) => {

    return (
        <button onClick={props.fn} className={props.className}>
            <img src={'./images/cart2.svg'} alt='img-cart' className='p-1' style={{width: 30}}/>3
        </button>
    )
}

export default CartWidget