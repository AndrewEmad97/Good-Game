import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
function GameSearch() {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  // useSearchParams reads the ?q= from the URL
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  useEffect(() => {
    const fetchAndFilter = async () => {
      const res = await fetch("/api/games");
      const data = await res.json();
      const filtered = data.filter((game) =>
        game.title.toLowerCase().includes(query.toLowerCase()),
      );
      setGames(filtered);
    };
    if (query) fetchAndFilter();
  }, [query]);

  return (
    <div className="min-h-screen w-screen bg-gray-950 text-white overflow-x-hidden pt-20">
      <div className="max-w-6xl mx-auto px-8 py-8">
        <h1 className="text-2xl font-bold mb-1">
          Results for: <span className="text-amber-500">"{query}"</span>
        </h1>
        <p className="text-white/40 text-sm mb-8">{games.length} games found</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {games.map((game) => (
            <div
              key={game.id}
              onClick={() => navigate(`/game/${game.id}`)}
              className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-amber-600/40 transition-all duration-200"
            >
              <div className="overflow-hidden h-36">
                <img
                  src={game.thumbnail}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3">
                <p className="text-white text-sm font-medium truncate group-hover:text-amber-400 transition-colors">
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
      </div>
    </div>
  );
}

export default GameSearch;
