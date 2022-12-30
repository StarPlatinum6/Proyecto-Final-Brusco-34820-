import ItemList from "../ItemList/ItemList";

const ItemListContainer = ({ greeting }) => {
  return (
    <>
      <div className="tracking-widest p-5 flex justify-center flex-col items-center">
        <h1 className="p-4 text-4xl font-thin tracking-widest font-serif text-slate-500">
          {greeting}
        </h1>
        <ItemList />
      </div>
    </>
  );
};

export default ItemListContainer;
