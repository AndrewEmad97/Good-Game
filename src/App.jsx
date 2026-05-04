import { Routes, Route, useLocation } from "react-router-dom";
import GamePage from "./pages/GamePage";
import "./App.css";
import Home from "./pages/Home";
import HomeNavbar from "./components/HomeNavBar";
import Navbar from "./components/NavBar";
import GameList from "./pages/GameList";
import GameSearch from "./pages/GameSearch";

function App() {
  const location = useLocation();
  return (
    <div>
      {location.pathname === "/" ? <HomeNavbar /> : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<GamePage />} />
        <Route path="/GameList" element={<GameList />} />
        <Route path="/search" element={<GameSearch />} />
      </Routes>
    </div>
  );
}

export default App;
