import { Link } from "react-router-dom";

import Search from "./Search";
import ShoppingCart from "./ShoppingCart";

const Navbar = () => {
  return (
    <div className="flex flex-col items-center justify-center h-fit max-w-screen bg-blue-200 gap-4 pb-4 shadow-sm">
      {/* Top layer */}
      <div className="flex flex-row justify-between items-center bg-blue-100 w-screen px-4 py-2">
        <Link to="/" className="navbar_font ml-[4vw] select-none">
          <h1>Reach for Knowledge</h1>
        </Link>
        <div className="flex flex-row items-center gap-8 mr-10">
          <Search />
          <ShoppingCart />
        </div>
      </div>

      {/* Bottom layer */}
      <div className="flex flex-row flex-wrap justify-around items-center gap-8 select-none">
        <Link className="hover:scale-95" to="/books/fantasy">
          Fantasy
        </Link>
        <Link className="hover:scale-95" to="/books/thriller">
          Thriller
        </Link>
        <Link className="hover:scale-95" to="/books/mystery">
          Mystery
        </Link>
        <Link className="hover:scale-95" to="/books/romance">
          Romance
        </Link>
        <Link className="hover:scale-95" to="/books/autobiographies">
          Autobiography
        </Link>
        <Link className="hover:scale-95" to="/books/history">
          History
        </Link>
        <Link className="hover:scale-95" to="/books/science">
          Science
        </Link>
        <Link className="hover:scale-95" to="/books/psychology">
          Psychology
        </Link>
        <Link className="hover:scale-95" to="/books/poetry">
          Poetry
        </Link>
        <Link className="hover:scale-95" to="/books/cookbooks">
          Cookbooks
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
