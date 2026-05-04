import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

function GamePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [selectedShot, setSelectedShot] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      const res = await fetch(`/api/game?id=${id}`);
      const data = await res.json();
      setGame(data);
    };

    fetchGame();
  }, [id]);

  if (!game)
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-950">
        <p className="text-teal-500 text-lg tracking-widest animate-pulse">
          Loading...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen w-screen bg-gray-950 text-white overflow-x-hidden">
      {/* Hero banner */}
      <div className="relative h-72 w-full overflow-hidden">
        <img
          src={game.thumbnail}
          className="absolute inset-0 w-full h-full object-cover blur-sm brightness-50 scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-gray-950" />

        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-5 left-5 flex items-center gap-2 text-amber-500 hover:text-amber-400 hover:border-black transition-colors bg-transparent outline-none border-none cursor-pointer"
        >
          <IoArrowBack size={18} />
          <span className="text-sm">Back</span>
        </button>

        {/* Title block */}
        <div className="absolute bottom-6 left-8 flex items-end gap-5">
          <img
            src={game.thumbnail}
            className="w-22 h-22 rounded-xl object-cover border-2 border-amber-600/40"
          />
          <div>
            <h1 className="text-3xl font-bold m-0">{game.title}</h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-teal-400 text-sm">{game.genre}</span>
              <span className="text-white/20">•</span>
              <span className="text-white/50 text-sm">{game.platform}</span>
              <span className="text-white/20">•</span>
              <span className="text-amber-600/80 text-sm border border-amber-600/30 rounded-full px-2 py-0.5">
                {game.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-8 py-8">
        {/* Meta row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Developer", value: game.developer },
            { label: "Publisher", value: game.publisher },
            { label: "Release Date", value: game.release_date },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3"
            >
              <p className="text-teal-500 text-xs mb-1">{label}</p>
              <p className="text-white text-sm font-medium">{value}</p>
            </div>
          ))}
        </div>

        {/* Screenshots */}
        {game.screenshots?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-amber-500 text-xs uppercase tracking-widest mb-3">
              Screenshots
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {game.screenshots.map((shot) => (
                <img
                  key={shot.id}
                  src={shot.image}
                  onClick={() => setSelectedShot(shot.image)}
                  className="rounded-xl object-cover w-full h-36 border border-white/10 hover:border-amber-600/40 transition-colors cursor-pointer"
                />
              ))}
            </div>
          </div>
        )}

        {/* Fullscreen overlay */}
        {selectedShot && (
          <div
            onClick={() => setSelectedShot(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm cursor-pointer"
          >
            <img
              src={selectedShot}
              className="max-w-4xl w-full rounded-2xl border border-white/10 shadow-2xl"
            />
          </div>
        )}

        {/* System requirements */}
        {game.minimum_system_requirements && (
          <div className="mb-8">
            <h2 className="text-amber-500 text-xs uppercase tracking-widest mb-3">
              Minimum System Requirements
            </h2>
            <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 grid grid-cols-2 gap-4">
              {Object.entries(game.minimum_system_requirements).map(
                ([key, value]) => (
                  <div key={key}>
                    <p className="text-teal-500 text-xs capitalize mb-0.5">
                      {key}
                    </p>
                    <p className="text-white/70 text-sm">{value}</p>
                  </div>
                ),
              )}
            </div>
          </div>
        )}

        {/* Play button */}

        <a
          href={game.game_url}
          target="_blank"
          rel="noreferrer"
          className=" flex items-center justify-center w-full font-semibold py-3 rounded-2xl border-2 border-amber-600 text-amber-500   hover:bg-amber-600 hover:text-white transition-all duration-300"
        >
          Play for Free
        </a>
      </div>
    </div>
  );
}

export default GamePage;
