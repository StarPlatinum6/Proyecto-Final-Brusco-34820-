import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { Link } from "react-router-dom"

const Cart = () => {

  const { cart, clearList, isCartEmpty, total, removeItem } = useContext(CartContext)

  if (isCartEmpty) {
    return (
      <div className="m-16">
        <h1 className="mt-8 pb-8 text-5xl font-thin tracking-wider text-slate-500 font-serif uppercase">Carrito vacío</h1>
        <button className="font-sans font-light text-xl text-slate-50 bg-indigo-500 p-3 rounded-md m-3 hover:bg-indigo-700 transition-all w-48 shadow-md"><Link to={`/`}>Volver a la tienda</Link></button>
      </div>
    )
  }

  return (
    <>
      <>
      <h1 className="my-10 text-4xl font-thin tracking-wider text-slate-500 font-serif uppercase">Carrito de Compra</h1>
        {cart.map((item) => (
          <div key={item.id} className={"flex px-16 py-6 my-6 justify-between items-center bg-slate-100"}>
            <img
            src={item.pictureUrl}
            alt=""
            className="rounded-xl max-h-20 w-20 scale-125 shadow-lg shadow-slate-100/80 ring-2 ring-slate-700/50"
            />
            <p className="text-md w-96 text-xl text-slate-500 font-medium tracking-wide h-12 flex justify-center items-center">{item.category} {item.title}</p>
            <p className="text-md w-max-content text-lg text-slate-500 font-medium tracking-wide h-12 flex justify-center items-center">$ {item.price} / {item.quantity} Un.</p>
            <p className="text-md w-max-content text-3xl text-slate-700 font-medium tracking-wide h-12 flex justify-center items-center">$ {item.price * item.quantity}</p>
            <button className="text-md w-max-content text-3xl text-red-700 bg-red-400/20 hover:bg-red-400/60 transition-all rounded-md p-3 font-medium tracking-wide h-12 flex justify-center items-center" onClick={() => removeItem(item.id)}>X</button>
          </div>
        ))}
      </>
      <div className="text-4xl p-6">
        <button className="m-3 p-3 border text-red-700 bg-red-400/20 hover:bg-red-400/60 transition-all rounded-lg font-serif" onClick={clearList}>Borrar todo</button>
        <p className="mt-8 pb-8 text-4xl font-thin tracking-wider text-slate-500 font-serif uppercase">Total de la compra: $ {total}</p>
      </div>
    </>
  )
}

export default Cart