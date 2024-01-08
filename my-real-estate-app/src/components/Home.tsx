export const Home = () => {
  const backgroundImageStyle = {
    backgroundImage: "url(/images/couch-447484_1280.jpg)",
    backgroundSize: "65%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    borderRadius: "12px",
    opacity: "0.90",
    width: "100%",
    height: "90vh",
  };

  return (
    <div>
      <div
        style={backgroundImageStyle}
        className="flex items-center justify-center w-auto"
      >
        <div className="flex flex-col items-center  h-full">
          <h1 className="mb-4 mt-16 font-extrabold text-5xl">
            {" "}
            MODERN HOUSING SOLUTIONS
          </h1>

          <form className="flex flex-row items-center">
            <input
              type="text"
              placeholder="rent in your area"
              className="mr-5 h-10 pl-4 border rounded-lg bg-sky-100 hover:bg-sky-200 active:bg-sky-300 focus:outline-none focus:ring focus:ring-violet-100"
            />
            <input
              type="text"
              placeholder="buy in your area"
              className="mr-5 h-10 pl-4 border rounded-lg bg-sky-100 hover:bg-sky-200 active:bg-sky-300 focus:outline-none focus:ring focus:ring-violet-100"
            />
            <input
              type="text"
              placeholder="our agents"
              className="mr-5 pl-4  h-10 border rounded-lg bg-sky-100 hover:bg-sky-200 active:bg-sky-300 focus:outline-none focus:ring focus:ring-violet-100"
            />
          </form>
        </div>
      </div>
      <div className="max-w-lg mx-auto mt-10">
      <div className="grid grid-cols-3 grid-flow-row-dense justify-center gap-4 items-top font-bold size-70">
        <p className="col-span-2">Lorem ipsum dolor sit amet.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti dicta asperiores eum, tempora quo laborum libero eligendi facilis adipisci optio.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, odio.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
        <p>Lorem ipsum dolor sit.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae!</p>
        <p>Lorem, ipsum dolor.</p>
        <p>Lorem, ipsum.</p>
        <p>
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          tempora exercitationem vero?
        </p>
      </div>
      </div>
    </div>
  );
};
