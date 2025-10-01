import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Homepage from "./routes/Homepage.jsx";
import BooksPage from "./routes/BooksPage.jsx";
import BookPageDetail from "./routes/BookPageDetail.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ShoppingCartPage from "./routes/ShoppingCartPage.jsx";
import ShopContextProvider from "./context/ShopContext.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/books/:category",
        element: <BooksPage />,
      },
      {
        path: "/books/works/:workId",
        element: <BookPageDetail />,
      },
      {
        path: "/cart",
        element: <ShoppingCartPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ShopContextProvider>
        <RouterProvider router={router} />
      </ShopContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
