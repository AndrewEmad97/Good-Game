import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function GameList() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    const fetchGames = async () => {
      const res = await fetch("/api/games?sort-by=popularity");
      const data = await res.json();
      const filtered = data.filter((game) => game.platform !== "Web Browser");
      setGames(filtered);
      setLoading(false);
    };
    fetchGames();
  }, []);

  // Auto-rotate carousel every 4 seconds
  useEffect(() => {
    if (!games.length) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 5);
    }, 4000);
    return () => clearInterval(interval);
  }, [games, activeIndex]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-gray-950">
        <p className="text-teal-500 text-lg tracking-widest animate-pulse">
          Loading...
        </p>
      </div>
    );

  const featuredGames = games.slice(0, 5);
  const popularGames = games.slice(5, 5 + visibleCount);
  const activeGame = featuredGames[activeIndex];

  return (
    <div className="min-h-screen w-screen bg-gray-950 text-white overflow-x-hidden pt-20">
      <div className="max-w-6xl mx-auto px-8 py-8">
        {/* ── Carousel ── */}
        <h2 className="text-amber-500 text-lg uppercase tracking-widest mb-4">
          Featured
        </h2>

        {/* Big card */}
        <div
          onClick={() => navigate(`/game/${activeGame.id}`)}
          className="relative w-full h-80 rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-amber-600/40 transition-all duration-300"
        >
          {/* Background image */}
          <img
            key={activeGame.id}
            src={activeGame.thumbnail}
            className="absolute inset-0 w-full h-full object-cover scale-105  brightness-50"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

          <div className="absolute bottom-6 left-6 flex items-end gap-4">
            <img
              src={activeGame.thumbnail}
              className="w-20 h-20 rounded-xl object-cover border-2 border-amber-600/40 shadow-lg"
            />
            <div>
              <h2 className="text-2xl font-bold text-white">
                {activeGame.title}
              </h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-teal-400 text-sm">
                  {activeGame.genre}
                </span>
                <span className="text-white/20">•</span>
                <span className="text-white/50 text-sm">
                  {activeGame.platform === "PC (Windows)"
                    ? "PC"
                    : activeGame.platform}
                </span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 right-6 flex items-center gap-2">
            {featuredGames.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(i);
                }}
                className={`rounded-full transition-all duration-300 outline-none border-none cursor-pointer ${
                  i === activeIndex
                    ? "bg-amber-500 w-5 h-2"
                    : "bg-white/30 w-2 h-2 hover:bg-teal-500"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Small preview cards for the 5 featured games */}
        <div className="grid grid-cols-5 gap-3 mt-3">
          {featuredGames.map((game, i) => (
            <div
              key={game.id}
              onClick={() => setActiveIndex(i)}
              className={`relative rounded-xl overflow-hidden cursor-pointer h-16 border transition-all duration-200 ${
                i === activeIndex
                  ? "border-amber-500/60 brightness-100"
                  : "border-white/10 brightness-75 hover:brightness-100"
              }`}
            >
              <img
                src={game.thumbnail}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <p className="absolute bottom-1 left-2 text-white text-xs font-medium truncate w-4/5">
                {game.title}
              </p>
            </div>
          ))}
        </div>

        {/* ── Popular Games Grid ── */}
        <div className="mt-12">
          <h2 className="text-amber-500 text-lg uppercase tracking-widest mb-1">
            Popular Games
          </h2>
          <p className="text-white/40 text-sm mb-6">
            {popularGames.length} games
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {popularGames.map((game) => (
              <div
                key={game.id}
                onClick={() => navigate(`/game/${game.id}`)}
                className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-amber-600/40 transition-all duration-200"
              >
                <div className="overflow-hidden h-36">
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <p className="text-white text-sm font-medium truncate group-hover:text-amber-400 transition-colors duration-200">
                    {game.title}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-teal-500 text-xs">{game.genre}</span>
                    <span className="text-white/30 text-xs">
                      {game.platform === "PC (Windows)" ? "PC" : game.platform}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {visibleCount < games.length - 5 && (
            <button
              onClick={() => setVisibleCount((prev) => prev + 20)}
              className="mt-8 w-full py-3 rounded-2xl border-2 border-amber-600 text-amber-500 hover:bg-amber-600 hover:text-white transition-all duration-200 cursor-pointer"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default GameList;
