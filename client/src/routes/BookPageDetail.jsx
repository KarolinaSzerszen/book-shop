import { focusManager, useIsRestoring, useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import TailwindSlider from "../components/SimpleSlider";
import { ShopContext } from "../context/ShopContext";
import Counter from "../components/Counter";

const BookPageDetail = () => {
  const { workId } = useParams(); // like "works/OL12345W"

  //console.log("workId from URL:", workId);

  const [book, setBook] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [isLoadingSubjectBooks, setIsLoadingSubjectBooks] = useState(true);
  const [isLoadingAuthorBooks, setIsLoadingAuthorBooks] = useState(true);
  const [authorBooks, setAuthorBooks] = useState([]);
  const [similarBooks, setSimilarBooks] = useState([]);
  const [amount, setAmount] = useState(1);
  const [startingNumber, setStartingNumber] = useState(1);
  const [openSummary, setOpenSummary] = useState(false);

  const { addToCart } = useContext(ShopContext);
  useEffect(() => {
    async function fetchBook() {
      const res = await fetch(`https://openlibrary.org/works/${workId}.json`);

      const data = await res.json();
      setBook(data);
      const authorData = await fetchAuthors(data);
      setAuthors(authorData);
    }

    fetchBook();
  }, [workId]);

  useEffect(() => {
    async function loadAuthorBooks() {
      setIsLoadingAuthorBooks(true);
      const fetchedAuthorBooks = await fetchAuthorBooks(book);
      setAuthorBooks(fetchedAuthorBooks);
      setIsLoadingAuthorBooks(false);
    }
    loadAuthorBooks();
  }, [book]);

  useEffect(() => {
    async function loadSimilarBooks() {
      setIsLoadingSubjectBooks(true);
      const fetchedSimilarBooks = await fetchSimilarBooks(book);
      setSimilarBooks(fetchedSimilarBooks);
      setIsLoadingSubjectBooks(false);
    }
    loadSimilarBooks();
  }, [book]);

  useEffect(() => {
    setStartingNumber(1);
  }, [workId]);

  async function fetchAuthors(book) {
    if (!book?.authors) return [];

    const authorPromise = book.authors.map(async (a) => {
      const authRes = await fetch(
        `https://openlibrary.org${a.author.key}.json`
      );

      return authRes.json();
    });
    return Promise.all(authorPromise);
  }

  async function fetchAuthorBooks(book) {
    if (!book?.authors?.length) return [];
    const authorKey = book.authors[0].author.key;
    const resAuthBook = await fetch(
      `https://openlibrary.org/search.json?author=${encodeURIComponent(
        authorKey
      )}&limit=20`
    );
    const authBookData = await resAuthBook.json();
    const filteredAuthorBooks = authBookData.docs.filter(
      (b) => b.key !== book.key
    );

    return (filteredAuthorBooks || [])
      .filter((b) => b.cover_i)
      .slice(1, 9)
      .map((book) => ({
        key: book.key,
        cover_id: book.cover_i,
      }));
  }

  async function fetchSimilarBooks(book) {
    if (!book?.subjects?.length) return [];
    console.log(book.subjects[1]);
    const resSimilBooks = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(
        book.subjects[1]
      )}&limit=20`
    );
    const similarBookData = await resSimilBooks.json();

    return (similarBookData.docs || [])
      .filter((b) => b.cover_i)
      .slice(1, 9)
      .map((book) => ({
        key: book.key,
        cover_id: book.cover_i,
      }));
  }
  //async function getTotal(num) {
  //  setTotal(5 * num);
  //}

  //async function handleMinus() {
  //  if (amount > 1) setAmount(amount - 1);
  //  else return;
  //}
  //async function handlePlus() {
  //  setAmount(amount + 1);
  //}

  function getDescription(desc) {
    if (!desc) {
      return "It appears the descrioption is not yet available. Do not fret we are already working on it.";
    }
    return typeof desc === "string" ? desc : desc.value;
  }

  if (!book) return <div className="p-8">Loading...</div>;
  function handleClick() {
    setOpenSummary((prev) => !prev);
    console.log(openSummary);
  }
  //let subject = book.subjects[0];
  //console.log(subject);
  //console.log(authors.map((a) => a.name));
  return (
    <div>
      <div className="flex flex-col md:flex-row p-14 sm:p-18 justify-center ">
        {!loaded && (
          <div className="">
            <div className="object-fit min-h-[400px] min-w-[300px] md:w-[380px] md:h-[520px]  bg-gray-200 animate-pulse rounded "></div>
          </div>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold  md:mb-4 flex md:hidden">
          {book.title}
        </h1>
        {book.covers && book.covers.length > 0 ? (
          <div className="mt-8 mb-8 lg:m-20 flex justify-center">
            <img
              src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`}
              alt={book.title}
              className={`object-fit min-h-[260px] min-w-[180px] md:w-[380px] md:h-[520px] ${
                loaded ? "block" : "hidden"
              }`}
              onLoad={() => setLoaded(true)}
            />
          </div>
        ) : (
          <div className="h-80 w-60 bg-gray-200 flex items-center justify-center">
            No cover available
          </div>
        )}
        <div className="p-2 max-w-3xl md:ml-10 ">
          <h1 className="text-3xl font-bold mb-4 hidden md:flex">
            {book.title}
          </h1>
          <div className="flex flex-row justify-start gap-4 mb-8">
            {authors.map((a) => (
              <p key={a.key}>{a.name}</p>
            ))}
          </div>
          <div className="m-8">
            <h2 className="text-xl">5$</h2>
          </div>
          <div className="flex flex-row justify-around gap-6 sm:gap-12">
            {/* How many books */}
            {/*<div className=" flex flex-row gap-4 w-fit border-2">
              <div className="p-1 border-r-2" onClick={handleMinus}>
                -
              </div>

              <div className="p-1">{amount}</div>
              <div className="p-1  border-l-2" onClick={handlePlus}>
                +
              </div>
            </div>*/}
            <Counter
              startingNumber={startingNumber}
              onChange={setAmount}
              key={workId}
            />
            {/* ends how many books */}
            <button
              className="bg-blue-200 w-30 shadow-2xl hover:bg-blue-400 "
              onClick={() =>
                addToCart(book.key, amount, book.covers?.[0], book.title)
              }
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className="pt-18 pr-4 pl-4 pb-18 md:mr-10 md:ml-10">
        <h2 className="text-2xl font-bold mb-4 ">Summary</h2>
        <div className="h-fit">
          <div
            className={`${openSummary ? "h-fit" : "h-[10vh] overflow-hidden"} `}
          >
            <p className="text-xl"> {getDescription(book.description)}</p>
          </div>
          {getDescription(book.description).length > 500 && (
            <button
              className="h-fit w-full bg-gray-200 hover:bg-gray-300 mt-4"
              onClick={handleClick}
            >
              {openSummary ? "Hide summary" : "Show more"}
            </button>
          )}
        </div>
      </div>
      {/*From the same author.*/}
      {authors.length > 0 && (
        <TailwindSlider
          isLoading={isLoadingAuthorBooks}
          name={`Other books written by  ${authors[0].name}`}
          books={authorBooks}
        />
      )}

      {/* books on the same subject */}

      <TailwindSlider
        isLoading={isLoadingSubjectBooks}
        name={"Similar books"}
        books={similarBooks}
      />
    </div>
  );
};

export default BookPageDetail;
