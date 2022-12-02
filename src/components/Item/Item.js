import { Link } from "react-router-dom"
import Btn from "../Btn/Btn";

const Item = ({ part }) => {
  return (
    <div
      key={part.id}
      className={
        "bg-indigo-300 rounded-md p-2 flex flex-col items-center xl:flex-row"
      }
    >
      <h1 className={"text-sm bg-indigo-100 p-2 rounded-md mb-5 w-max-content"}>
        {part.title}
      </h1>

      <h3 className={"text-xs text-justify bg-indigo-200 p-2 rounded-md"}>
        {part.description.slice(0,100)}...
      </h3>
      <img
        src={part.pictureUrl}
        alt=""
        className={"rounded-xl w-36 mt-3 flex"}
      />
      <h2 className={"text-sm bg-indigo-200 p-2 rounded-md w-max m-auto"}>
        $ {part.price}
      </h2>
      <Link to={`/product/${part.id}`}><Btn className={"bg-slate-300 text-xs py-1 px-3 rounded-md"}>Detalle del Producto</Btn></Link>
    </div>
  );
};

export default Item;
