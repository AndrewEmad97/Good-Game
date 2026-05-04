import { Link } from "react-router-dom";
import { PiSquaresFourBold } from "react-icons/pi";

function HomeNavbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-4 backdrop-blur-xs bg-black/50 border-b border-white/10">
      <Link to="/" className="font-bold text-lg ">
        <span className="text-amber-500">Good</span>
        <span className="text-teal-500"> Game</span>
      </Link>

      <div className="flex items-center gap-8">
        <Link to="/" className="text-amber-500">
          Home
        </Link>
        <Link
          to="/GameList"
          className="flex justify-end items-center text-white/50 hover:text-teal-400 transition-colors duration-300"
        >
          Game List{" "}
          <span className="pl-2">
            {" "}
            <PiSquaresFourBold />
          </span>
        </Link>
      </div>
    </nav>
  );
}

export default HomeNavbar;
