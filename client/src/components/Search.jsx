import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Search = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [focus, setFocus] = useState(false);

  const abortRef = useRef(null);
  const debounceRef = useRef(null);

  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setFocus(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleSearch(value) {
    setInput(value);

    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }

    if (!value.trim()) {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
      setResults([]);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch(
          `https://openlibrary.org/search.json?title=${value}&limit=10`,
          { signal: controller.signal }
        );
        const data = await res.json();

        console.log("Search:", data);

        const newArray = data.docs.map((book) => ({
          key: book.key,
          title: book.title,
          cover: book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : null,
        }));
        console.log("New results:", newArray);
        setResults(newArray);
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }
      } finally {
        abortRef.current = null;
      }
    }, 20);
  }

  return (
    <div ref={containerRef} className="relative w-fit mr-2 sm:mr-10">
      <div className="flex flex-row">
        <input
          type="text"
          placeholder="Search a book by its name..."
          className="bg-transparent hover:bg-white w-[20vw] border-none focus: outline-none focus:bg-white"
          value={input}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setFocus(true)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="black"
        >
          <circle cx="10.5" cy="10.5" r="7.5"></circle>
          <line x1="16.5" y1="16.5" x2="22" y2="22"></line>
        </svg>
      </div>
      <div className="bg-blue-100 absolute h-fit max-h-80 w-[90vw] md:w-[22vw] mt-12 sm:mt-7 overflow-y-scroll z-10 -right-14 sm:right-0 ">
        {focus &&
          results.length > 0 &&
          results.map((book) => (
            <Link key={book.key} to={`/books${book.key}`}>
              <div
                key={book.key}
                className="p-2 border-b flex flec-row select-none drag-none"
              >
                {book.cover && (
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-10 h-14 inline mr-2 select-none"
                  />
                )}
                {book.title}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Search;
