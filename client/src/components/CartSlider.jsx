import { useEffect, useRef, useState } from "react";
import { useBookContext } from "../context/BookContext";
import { Link } from "react-router-dom";

function CartSlider({
  cartState,
  setCartSlideOpen,
  bookImg,
  title,
  authors,
  amount,
  thisId,
  similarBooks,
}) {
  const [books, setBooks] = useState([]);
  //console.log("Similar:", similarBooks);
  const cartRef = useRef();
  const { recentBooks } = useBookContext();
  useEffect(() => {
    function handleClickOutside(event) {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartSlideOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setCartSlideOpen]);

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (recentBooks.length === 0) return;
      const normalizeId = (id) => id.replace("/works/", "");
      const bookData = await Promise.all(
        recentBooks
          .filter((id) => normalizeId(id) !== thisId)
          .map(async (workId) => {
            try {
              const res = await fetch(`https://openlibrary.org${workId}.json`);
              const data = await res.json();

              return {
                title: data.title,
                coverImg: data.covers
                  ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-M.jpg`
                  : null,
                key: workId,
              };
            } catch (err) {
              console.error("Faileded to fetch book", workId, err);
              return null;
            }
          })
      );
      setBooks(bookData.filter(Boolean));
    };
    fetchBookDetails();
  }, [recentBooks, thisId]);
  //console.log("This is it: ", books);
  //console.log("This is context: ", recentBooks);
  //console.log("this is thisId: ", thisId);
  return (
    <div
      ref={cartRef}
      className={`bg-blue-200 w-[80vw]  h-fit sm:w-[50vw] sm:h-[100vh] pb-4 absolute sm:fixed -right-[80vw] sm:-right-[50vw] -top-26 sm:-top-0  bottom-0 z-22 flex flex-col items-center gap-6 ${
        cartState
          ? "transform -translate-x-full transition-transform duration-500"
          : "hidden"
      }`}
    >
      <div className="mt-8 ">
        <h2 className="text-xl">Item added to the cart.</h2>
      </div>
      <div className="rounded-xl border-2 h-fit w-[62vw] sm:w-[46vw] flex flex-col md:flex-row">
        {bookImg && bookImg.length > 0 ? (
          <div className="flex justify-center">
            <img
              src={`https://covers.openlibrary.org/b/id/${bookImg[0]}-M.jpg`}
              alt={title}
              className={`object-fit min-h-[120px] min-w-[80px] md:w-[10px] md:h-[120px] m-4 `}
            />
          </div>
        ) : (
          <div className="h-80 w-60 bg-gray-200 flex items-center justify-center">
            No cover available
          </div>
        )}
        <div className="m-4">
          <h2 className="text-xl lg:text-3xl font-bold mb-4">{title}</h2>
          <div className="flex flex-row justify-start gap-4 mb-8">
            {authors?.map((a) => (
              <p key={a.key}>{a.name}</p>
            ))}
          </div>
          <div>
            <h2>Copies: {amount}</h2>
            <h2>Total: {5 * amount} $</h2>
          </div>
        </div>
      </div>
      <h2 className="text-center">
        {books.length > 0 ? "Recently Viewed" : "Maybe this will interest you"}
      </h2>

      <div className="flex flex-col gap-4 overflow-scroll h-[40vh]  lg:h-[80vh] w-fill">
        {(books?.length > 0 ? books : similarBooks).map((b) => (
          <Link
            key={b.key}
            className="flex flex-row gap-10 items-center pl-10 p-3 w-[62vw] sm:w-[46vw]  border-2 rounded-lg "
            to={`/books${b.key}`}
            onClick={() => handleBookClick(b.key)}
          >
            {b.coverImg || b.cover_id ? (
              <img
                src={
                  b.coverImg
                    ? b.coverImg
                    : `https://covers.openlibrary.org/b/id/${b.cover_id}-M.jpg`
                }
                alt={b.title}
                className="w-[60px] h-[100px] object-cover rounded"
              />
            ) : (
              <div className="w-[120px] h-[180px] bg-gray-300 flex items-center justify-center text-sm text-gray-600">
                No image
              </div>
            )}
            <p className="text-center mt-2 text-lg">{b.title}</p>
          </Link>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-[4vw] text-center ">
        <Link className="bg-blue-300 w-40 p-1" to={`/cart`}>
          Go to Cart
        </Link>
        <div
          className="bg-blue-300 w-40 p-1"
          onClick={() => setCartSlideOpen(false)}
        >
          Continue shopping
        </div>
      </div>
    </div>
  );
}

export default CartSlider;
