import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCardById } from "./cardsSlice"; // Import the card selector

export default function Card({ id }) {
  // Use useSelector with the selector to get the card by ID
  const card = useSelector((state) => selectCardById(id)(state));
  const [flipped, setFlipped] = useState(false);

  if (!card) {
    return <div>Card not found</div>;
  }

  return (
    <li>
      <button className="card" onClick={() => setFlipped(!flipped)}>
        {flipped ? card.back : card.front}
      </button>
    </li>
  );
}
