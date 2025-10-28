import { createContext, useState, useContext, useEffect } from "react";

const BookContext = createContext();

export function BookProvider({ children }) {
  // Load from localStorage when the context initializes
  const [recentBooks, setRecentBooks] = useState(() => {
    try {
      const saved = localStorage.getItem("recentBooks");
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error("Failed to parse recentBooks from localStorage", err);
      return [];
    }
  });

  // Save to localStorage every time recentBooks changes
  useEffect(() => {
    localStorage.setItem("recentBooks", JSON.stringify(recentBooks));
  }, [recentBooks]);

  return (
    <BookContext.Provider value={{ recentBooks, setRecentBooks }}>
      {children}
    </BookContext.Provider>
  );
}

export function useBookContext() {
  return useContext(BookContext);
}
