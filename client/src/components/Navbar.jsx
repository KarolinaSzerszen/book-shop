import { Link } from "react-router-dom";

import Search from "./Search";
import ShoppingCart from "./ShoppingCart";
import { useEffect, useRef, useState } from "react";
import arrowDown from "../assets/noun-expand-arrow-61408.svg";
import arrowUp from "../assets/noun-collapse-arrow-61412.svg";
import arrowLeft from "../assets/noun-previous-arrow-61415.svg";
import arrowRight from "../assets/noun-next-arrow-61543.svg";

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);

  const containerRef = useRef(null);

  const categories = [
    "fantasy",
    "thriller",
    "mystery",
    "romance",
    "autobiographies",
    "history",
    "science",
    "psychology",
    "poetry",
    "cookbooks",
  ];
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleClick() {
    setExpanded((prev) => !prev);
  }
  return (
    <div className="flex flex-col items-center justify-center h-fit max-w-screen bg-blue-200 gap-4 pb-1 shadow-sm relative">
      {/* Top layer */}
      <div className="flex flex-row justify-between items-center bg-blue-100 w-screen px-4 py-1 lg:py-5">
        <Link to="/" className="navbar_font ml-[4vw] select-none">
          <h1 className="text-xl md:text-4xl">Reach for Knowledge</h1>
        </Link>
        <div className="flex flex-row items-center gap-1 mr-2 md:mr-6">
          <Search />
          <ShoppingCart />
        </div>
      </div>

      {/* Bottom layer */}
      <div className="relative w-full">
        {/* Desktop list */}
        <div
          className={`flex-row flex-wrap justify-around items-center gap-7 select-none max-w-screen ml-16 mr-16 h-[4vh] overflow-hidden lg:h-[4vh] hidden sm:flex ${
            expanded && "h-fit"
          }`}
        >
          {categories.map((category) => (
            <Link
              key={category}
              className="hover:scale-95 transition-transform duration-200 text-xl"
              to={`/books/${category}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Link>
          ))}
        </div>

        {/* Mobile list */}
        <div ref={containerRef}>
          <div
            className={`bg-blue-200 w-10 absolute h-6 right-0 top-8 z-10 flex ${
              expanded && "hidden"
            }`}
            onClick={handleClick}
          >
            {!expanded && (
              <img
                src={arrowLeft}
                alt="arrow left"
                className="h-4 flex sm:hidden mt-1 ml-1 "
              />
            )}
          </div>
          <div
            className={`flex flex-col items-center gap-4 absolute bg-blue-200 w-full sm:hidden h-fit p-10 transition-all ease-in-out
                    ${expanded ? "-right-0" : " hidden"}`}
          >
            <div className="m-none " onClick={handleClick}>
              {expanded && (
                <img
                  src={arrowRight}
                  alt="arrow left"
                  className="h-3 flex sm:hidden ml-auto z-10 "
                />
              )}
            </div>

            {categories.map((category) => (
              <Link
                key={category}
                className="hover:scale-95 transition-transform duration-200"
                to={`/books/${category}`}
                onClick={handleClick}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile list ends */}
      </div>
      <div className="m-none" onClick={handleClick}>
        {" "}
        {expanded ? (
          <img
            src={arrowUp}
            alt="arrow down"
            className="h-3 hidden sm:flex lg:hidden"
          />
        ) : (
          <img
            src={arrowDown}
            alt="arrow down"
            className="h-3 hidden sm:flex lg:hidden"
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
