const Loading = () => {
  return (
    <div className="tracking-widest bg-slate-50 p-16 mx-auto max-w-screen-lg flex justify-center">
      <div className="flex justify-center my-6 p-8 text-4xl text-slate-100 bg-slate-500 drop-shadow-xl rounded-lg animate-pulse items-center tracking-widest font-serif">
        <h1>CARGANDO...</h1>
        <img
          className="animate-spin ml-4 h-8 w-8 opacity-90 invert"
          alt=""
          src="https://www.svgrepo.com/show/315795/spinner.svg"
        />
      </div>
    </div>
  );
};

export default Loading;

// w-96
