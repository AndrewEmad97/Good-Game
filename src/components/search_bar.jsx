import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import SearchResult from "./search_result";

function SearchBar() {
  const [inputText, setInputText] = useState("");
  const [games, setGames] = useState([]);
  const [results, setResults] = useState([]);
  const [focused, setFocused] = useState(false);
  const containerRef = useRef(null);

  const search = (value) => {
    if (!value) {
      setResults([]);
      return;
    }
    if (!games.length) return;

    const filtered = games.filter((game) =>
      game.title.toLowerCase().includes(value.toLowerCase()),
    );
    setResults(filtered);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    search(e.target.value);
  };

  const handleSelect = () => {
    setFocused(false);
    setInputText("");
    setResults([]);
  };
  const navigate = useNavigate();
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputText.trim().length >= 2) {
      navigate(`/search?q=${inputText.trim()}`);
      setFocused(false);
      setInputText("");
      setResults([]);
    }
  };

  const fetchGames = async () => {
    const res = await fetch("/api/games");
    const body = await res.json();
    setGames(body);
    console.log(body);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showResults = focused && results.length > 0;

  return (
    <div ref={containerRef} className="relative w-96">
      <div className="flex relative items-center">
        <input
          className="h-10 w-full rounded-2xl bg-white/5 border border-amber-600/60 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/40 text-teal-400 placeholder-teal-700 px-4 pr-10 transition-all duration-200 backdrop-blur-sm"
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onFocus={() => setFocused(true)}
          placeholder="Search games..."
          onKeyDown={handleKeyDown}
        />
        <IoSearch
          className="absolute right-3 text-amber-600 cursor-pointer"
          size={16}
        />
      </div>

      {showResults && (
        <div className="absolute top-full mt-2 w-full z-50 rounded-xl overflow-hidden border bg-black/85 backdrop-blur-xl border-amber-600/20 shadow-2xl shadow-black/60">
          {results.slice(0, 5).map((result, i) => (
            <SearchResult
              key={result.id}
              result={result}
              index={i}
              onSelect={handleSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
