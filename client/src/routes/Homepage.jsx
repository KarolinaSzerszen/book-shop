import frontImg from "../assets/frontImg.jpg";
import newBooksImg from "../assets/newBooksImg.jpg";
import mostPopularBooksImg from "../assets/mostPopularBooksImg.jpg";
import TailwindSlider from "../components/SimpleSlider.jsx";
import { useEffect, useState } from "react";

async function fetchNewBooks() {
  const res = await fetch(
    `https://openlibrary.org/search.json?q=history&first_publish_year=2021&limit=8`
  );
  const data = await res.json();
  return data.docs.map((book) => ({
    key: book.key,
    cover_id: book.cover_i,
  }));
}

async function fetchMostPopular() {
  const res = await fetch(
    `https://openlibrary.org/subjects/history.json?limit=10&sort=rating desc&limit=9
`
  );
  const data = await res.json();
  const selectedWorks = (data.works || []).slice(1, 9);
  return selectedWorks.map((book) => ({
    key: book.key,
    cover_id: book.cover_id,
  }));
}
const Homepage = () => {
  const [newBooks, setBooks] = useState([]);
  const [mostPopularBooks, setMostPopularBooks] = useState([]);
  const [isLoadingNew, setIsLoadingNew] = useState(true);
  const [isLoadingPopular, setIsLoadingPopular] = useState(true);

  useEffect(() => {
    async function loadNewBooks() {
      setIsLoadingNew(true);
      const fetchedNewBooks = await fetchNewBooks();
      setBooks(fetchedNewBooks);
      setIsLoadingNew(false);
    }
    loadNewBooks();
  }, []);

  useEffect(() => {
    async function loadPopularBooks() {
      setIsLoadingPopular(true);
      const fetchedMostPopularBooks = await fetchMostPopular();
      setMostPopularBooks(fetchedMostPopularBooks);
      setIsLoadingPopular(false);
    }
    loadPopularBooks();
  }, []);
  return (
    <div>
      {/* Image and Motivating message */}

      <div className="flex flex-row justify-center mt-4 ml-10 sm:ml-16  md:mt-16 overflow-hidden">
        <div>
          <img
            src={frontImg}
            alt="An open book"
            className=" w-[70vw]  h-30 sm:h-90 object-cover 
    "
          />
        </div>

        {/*<div className="-ml-70 bg-stone-100 h-fit mt-8">
          <p className="navbar_font ml-4">
            Never hesitate to glimpse behind the veil of your understanding.
          </p>
        </div>*/}
        <div className="-ml-20 sm:-ml-70 bg-stone-100 h-fit mt-8">
          <p className="navbar_font ml-4">
            Never hesitate to glimpse behind the veil of your understanding.
          </p>
        </div>
      </div>
      {/* Book categories */}
      <div className="mt-10 md:mt-16">
        {/* New */}

        {/* Tiles with books */}
        <TailwindSlider
          books={newBooks}
          isLoading={isLoadingNew}
          name={"New books"}
          img={newBooksImg}
        />

        {/* Most Popular */}
        <div>
          {/* Tiles with books */}
          <TailwindSlider
            books={mostPopularBooks}
            isLoading={isLoadingPopular}
            name={"Most Popular"}
            img={mostPopularBooksImg}
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;

//Reach for knowledge
