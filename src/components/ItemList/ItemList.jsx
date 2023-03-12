import Item from "../Item/Item";

const ItemList = ({ parts, categoryId }) => {
  return (
    <>
      <h1 className="-my-4 pb-8 text-5xl font-thin tracking-wider text-slate-500 font-serif">
        {categoryId}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl  gap-12 p-8 font-sans">
        {parts.map((part) => (
          <Item key={part.id} part={part} />
        ))}
      </div>
    </>
  );
};

export default ItemList;
