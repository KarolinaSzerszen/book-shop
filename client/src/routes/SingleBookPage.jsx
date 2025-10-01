

  async function fetchBooks(category) {
    const res = await fetch(
      `https://openlibrary.org/subjects/${category}.json`
    );
    return res.json();
  }

  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  const { data, isLoading } = useQuery({
    queryKey: ["books", category],
    queryFn: () => fetchBooks(category),
  });

  const books = data?.works || [];

  return (
    <div className="p-8">
      <h1 className="text-center mb-8 text-2xl">
        {" "}
        {capitalizeFirstLetter(category)} Books
      </h1>
      <div className="flex flex-wrap justify-center gap-10">
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="h-90 bg-gray-200 animate-pulse rounded w-70"
              />
            ))
          : books.map((book) => (
              <Link key={book.key} to={`/books${book.key}`}>
                <div
                  key={book.key}
                  className="p-4 bg-white rounded shadow w-70 hover:scale-95 select-none"
                >
                  <img
                    src={
                      book.cover_id
                        ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
                        : "https://via.placeholder.com/150"
                    }
                    alt={book.title}
                    className="w-full h-96 object-cover rounded"
                  />
                  <h2 className="font-semibold mt-2">{book.title}</h2>
                  <p className="text-sm text-gray-600">
                    {book.authors?.map((a) => a.name).join(", ")}
                  </p>
                  <p className="text-xs text-gray-400">
                    {book.first_publish_year}
                  </p>
                </div>
              </Link>
            ))}
      </div>
    </div>