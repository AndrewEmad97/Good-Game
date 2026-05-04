import BgImage from "../assets/bg.jpg";
import SearchBar from "../components/search_bar";
function Home() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <img
        src={BgImage}
        className="absolute h-screen w-screen -z-10 brightness-60 "
      />
      <div
        className="absolute h-screen w-screen -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.8) 10%, transparent 100%)",
        }}
      />
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold">
          <span className="text-amber-500">G</span>
          <span className="bg-linear-to-r from-amber-500 to-teal-500 text-transparent bg-clip-text">
            ood Gam
          </span>
          <span className="text-teal-500 ">e</span>
        </h1>
        <div className="card">
          <SearchBar />
        </div>
        <p className=" text-teal-600">Play More. Miss Nothing.</p>
      </div>
    </div>
  );
}

export default Home;
