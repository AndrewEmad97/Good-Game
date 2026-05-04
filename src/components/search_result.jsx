import { useNavigate } from "react-router-dom";

function SearchResult({ result, index, onSelect }) {
  const navigate = useNavigate();
  const { thumbnail, title, platform, genre, id } = result;

  return (
    <div
      onClick={() => {
        navigate(`/game/${id}`);
        onSelect();
      }}
      className="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-all duration-150 group border-b border-white/5 hover:bg-amber-600/10 last:border-none"
    >
      {/* Thumbnail */}
      <div className="w-12 h-10 rounded-lg overflow-hidden shrink-0 border border-white/10">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col min-w-0">
        <span className="text-white text-sm font-medium truncate group-hover:text-amber-400 transition-colors duration-150">
          {title}
        </span>
        <span className="text-teal-500 text-xs">{genre}</span>
      </div>

      <div className="ml-auto shrink-0">
        <span className="text-xs text-amber-600/70 border border-amber-600/20 rounded-full px-2 py-0.5">
          {platform === "PC (Windows)" ? "PC" : platform}
        </span>
      </div>
    </div>
  );
}

export default SearchResult;
