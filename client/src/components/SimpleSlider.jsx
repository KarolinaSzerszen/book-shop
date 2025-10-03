import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Custom Arrow Components

const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
};

const Arrow = ({ className, style, onClick, direction }) => {
  return (
    <div
      className={`absolute top-1/2 transform -translate-y-1/2 z-20 cursor-pointer 
                  bg-white/70 hover:bg-white rounded-full p-2 shadow-lg ${
                    direction === "left" ? "left-2" : "right-2"
                  }`}
      style={{ ...style }}
      onClick={onClick}
    >
      {direction === "left" ? "<" : ">"}
    </div>
  );
};

const TailwindSlider = ({ books = [], isLoading = false, name, img }) => {
  const [slidesToShow, setSlidesToShow] = useState(6);

  // 2️⃣ Add this useEffect to dynamically update slides on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) setSlidesToShow(3);
      else if (window.innerWidth <= 768) setSlidesToShow(4);
      else if (window.innerWidth <= 1024) setSlidesToShow(5);
      else if (window.innerWidth <= 2000) setSlidesToShow(6);
      else setSlidesToShow(6);
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 3️⃣ Then use the state in your slider settings
  const settings = {
    slidesToShow,
    swipeToSlide: true,
    infinite: true,
    centerMode: slidesToShow > 2, // only enable centerMode on desktop
    centerPadding: "0px",
    prevArrow: <Arrow direction="left" />,
    nextArrow: <Arrow direction="right" />,
  };

  const items = Array.from({ length: 6 }, (_, i) => i + 1);

  return (
    <div className="mb-8">
      <div className="relative h-[6vh] md:h-[10vh] 2xl:h-[14vh]  flex items-center overflow-hidden bg-blue-200 bg-gradient-to-r from-blue-300 to-transparent">
        {/* Text content */}
        <p className="z-10 p-2 pl-4 text-black text-sm sm:text-2xl">{name}</p>

        {/* Image (fills right side) */}
        {img && (
          <img
            src={img}
            alt="new book image"
            className="absolute right-0 top-0 h-full w-[40vw] object-cover  
                    [-webkit-mask-image:linear-gradient(to_left,black_40%,transparent_100%)]
                    "
          />
        )}
      </div>
      <div className="relative w-full px-4 py-8">
        {isLoading ? (
          <Slider {...settings}>
            {items.map((item) => (
              <div key={item} className="px-2">
                <div className="bg-gray-300 rounded-xl h-[20vh] md:h-[30vh] 2xl:h-[44vh] animate-pulse"></div>
              </div>
            ))}
          </Slider>
        ) : (
          <Slider {...settings}>
            {books.map((book) => (
              <Link
                key={book.key}
                to={`/books${book.key}`}
                onClick={scrollToTop}
              >
                <div key={book.key} className="px-2">
                  <div className="rounded-xl h-[20vh] md:h-[30vh] 2xl:h-[44vh] flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300 relative overflow-hidden">
                    {book.cover_id ? (
                      <img
                        src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
                        alt={book.title}
                        className="h-full w-full object-cover rounded-xl"
                      />
                    ) : (
                      <span className="text-gray-500">No Cover</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default TailwindSlider;
