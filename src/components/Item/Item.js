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
        {part.description}
      </h3>
      <img
        src={part.pictureUrl}
        alt=""
        className={"rounded-xl w-36 mt-3 flex"}
      />
      <h2 className={"text-sm bg-indigo-200 p-2 rounded-md w-max m-auto"}>
        $ {part.price}
      </h2>
    </div>
  );
};

export default Item;
