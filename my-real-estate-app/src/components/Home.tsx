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
    <div style={backgroundImageStyle} className="flex items-center justify-center w-auto">
      <div className="flex flex-col items-center  h-full">
      <h1 className="mb-4 mt-16 font-extrabold text-2xl"> MODERN HOUSING SOLUTIONS</h1>

        <form className="flex flex-row ">
          <input type="text" placeholder="rent in your area" className="mr-5 h-10 pl-4 border rounded-lg bg-sky-100 hover:bg-sky-200 active:bg-sky-300 focus:outline-none focus:ring focus:ring-violet-300"/>
          <input type="text" placeholder='buy in your area' className="mr-5 pl-4 border rounded-lg bg-sky-100 hover:bg-sky-200 active:bg-sky-300 focus:outline-none focus:ring focus:ring-violet-300"/>
          <input type="text" placeholder="our agents" className="mr-5 pl-4 border rounded-lg bg-sky-100 hover:bg-sky-200 active:bg-sky-300 focus:outline-none focus:ring focus:ring-violet-300"/>
        </form>
      </div>
    </div>
  );
};
