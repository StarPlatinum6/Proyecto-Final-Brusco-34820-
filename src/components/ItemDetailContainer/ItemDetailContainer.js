import ItemDetail from "../ItemDetail/ItemDetail";

const ItemDetailContainer = () => {
  return (
    <>
      <div className="tracking-widest bg-zinc-400 p-2 mx-auto">
        <h1>Item individual</h1>
        <ItemDetail />
      </div>
    </>
  );
};

export default ItemDetailContainer;
