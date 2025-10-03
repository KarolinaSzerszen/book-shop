import { useEffect, useState } from "react";

const Counter = ({ onChange, startingNumber }) => {
  const [amount, setAmount] = useState(startingNumber);

  useEffect(() => {
    setAmount(startingNumber);
  }, [startingNumber]);

  async function handleMinus() {
    setAmount((prev) => {
      if (prev <= 1) return prev;
      const newAmount = prev - 1;
      onChange(newAmount);
      return newAmount;
    });
  }
  async function handlePlus() {
    setAmount((prev) => {
      const newAmount = prev + 1;
      onChange(newAmount);
      return newAmount;
    });
  }

  return (
    <div className="flex flex-row gap-4 w-fit border-2 max-h-[44px]">
      <div className="p-2 border-r-2" onClick={handleMinus}>
        -
      </div>

      <div className="p-2 text-xl ">{amount}</div>
      <div className="p-2  border-l-2" onClick={handlePlus}>
        +
      </div>
    </div>
  );
};

export default Counter;
