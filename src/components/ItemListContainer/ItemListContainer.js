import ItemList from "../ItemList/ItemList";

const ItemListContainer = ({ greeting }) => {

  return (
    <>
      <div className="tracking-widest bg-zinc-300 p-2 mx-auto">
        <h1>{greeting}</h1>
        <ItemList/>
      </div>
    </>
  );
};

export default ItemListContainer;
