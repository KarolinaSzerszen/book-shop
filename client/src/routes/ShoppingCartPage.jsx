import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import Counter from "../components/counter.jsx";

const ShoppingCartPage = () => {
  const { cartItems, removeFromCart } = useContext(ShopContext);
  const [amounts, setAmounts] = useState({});
  const [partialValue, setPartialValue] = useState(5);
  const handleAmountChange = (bookId, newAmount) => {
    setAmounts((prev) => ({
      ...prev,
      [bookId]: newAmount,
    }));
  };

  const total = cartItems.reduce((sum, item) => {
    const qty = amounts[item.id] ?? item.quantity; // jeśli amounts[item.id] istnieje, używamy jej, inaczej quantity z cartItems
    return sum + qty * 5; // 5$ za książkę
  }, 0);
  return (
    <div className="flex flex-row gap-4 ">
      <div className="m-16 mr-4 bg-blue-100 flex flex-col  w-[50vw] ">
        {" "}
        {cartItems.length === 0 && (
          <div className="mt-10 text-center">
            <h2>Cart empty. Add items to cart for them to show</h2>
          </div>
        )}{" "}
        {/* Items  */}
        {cartItems.map((item) => (
          <div className="m-6 flex flex-row justify-between">
            {" "}
            <div className="flex flex-row gap-8">
              <img
                src={`https://covers.openlibrary.org/b/id/${item.cover}-M.jpg`}
                alt={item.id}
                className="h-[30vh] w-[10vw] object-fit"
              />
              <div>
                <h2>{item.title}</h2>
                <div className="mt-10 flex flex-row gap-4">
                  <Counter
                    startingNumber={amounts[item.id] || item.quantity}
                    onChange={(newAmount) =>
                      handleAmountChange(item.id, newAmount)
                    }
                    key={item.id}
                  />{" "}
                  <h3 onClick={() => removeFromCart(item.id)}>delete</h3>
                </div>
              </div>{" "}
            </div>
            <div className="mt-20">
              <h2>{partialValue * (amounts[item.id] || item.quantity)} $</h2>
            </div>
          </div>
        ))}
      </div>{" "}
      {/* Total */}
      <div className="m-16 ml-2 h-40 bg-blue-100  w-[30vw] ">
        <h2 className="m-5">Amount of the purchase: {total}</h2>
        {/* total  of your purchase */}
        {/* Button to buy it  */}
      </div>
    </div>
  );
};
export default ShoppingCartPage;
