import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  return (
    <div className="px-4">
      <Navbar />
    </div>
  );
}

export default App;
{
  cartItems.map((item) => (
    <li key={item.id} className="flex items-center gap-4">
      {item.cover && (
        <img
          src={`https://covers.openlibrary.org/b/id/${item.cover}-S.jpg`}
          alt={item.id}
          className="h-12 w-8 object-cover"
        />
      )}
      <span>Cover:{item.cover}</span>
      <span>{item.id}</span>
      <span>Quantity: {item.quantity}</span>
    </li>
  ));
}
