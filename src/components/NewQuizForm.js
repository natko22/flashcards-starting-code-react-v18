import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ROUTES from "../app/routes";
import { selectTopics } from "../features/topics/topicsSlice";
import { addQuiz } from "../features/quizzes/quizzesSlice";
import { addCard } from "../features/cards/cardsSlice";

export default function NewQuizForm() {
  const [name, setName] = useState("");
  const [cards, setCards] = useState([]);
  const [topicId, setTopicId] = useState("");
  const navigate = useNavigate();
  const topics = useSelector(selectTopics);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit is triggered");

    console.log("Name:", name);
    console.log("Topic ID:", topicId);

    if (name.length === 0) {
      console.log("Quiz name is missing");
    }
    if (topicId.length === 0) {
      console.log("Topic ID is missing");
    }

    if (name.length === 0 || topicId.length === 0) {
      console.log("Form validation failed");
      return;
    }

    console.log("Form validation passed");

    const cardIds = [];

    // Create cards and collect their IDs
    cards.forEach((card) => {
      const cardId = uuidv4();
      cardIds.push(cardId);
      console.log("Dispatching addCard:", { ...card, id: cardId });

      dispatch(addCard({ ...card, id: cardId }));
    });

    const quizId = uuidv4();
    console.log("Dispatching addQuiz:", { id: quizId, name, topicId, cardIds });

    // Dispatch addQuiz action with the collected cardIds
    dispatch(
      addQuiz({
        id: quizId,
        name,
        topicId,
        cardIds, // Use the collected cardIds array
      })
    );

    // Redirect to the quizzes page after creation
    navigate(ROUTES.quizzesRoute());
  };

  const addCardInputs = (e) => {
    e.preventDefault();
    setCards(cards.concat({ front: "", back: "" }));
  };

  const removeCard = (e, index) => {
    e.preventDefault();
    setCards(cards.filter((card, i) => index !== i));
  };

  const updateCardState = (index, side, value) => {
    const newCards = [...cards];
    newCards[index][side] = value;
    setCards(newCards);
  };

  return (
    <section>
      <h1>Create a new quiz</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="quiz-name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Quiz Title"
          required
        />
        <select
          id="quiz-topic"
          value={topicId} // Controlled component, ensures value is linked to state
          onChange={(e) => setTopicId(e.currentTarget.value)} // Updates state on selection
          placeholder="Topic"
          required
        >
          <option value="" disabled>
            Select a topic
          </option>
          {Object.values(topics).map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
        {cards.map((card, index) => (
          <div key={index} className="card-front-back">
            <input
              id={`card-front-${index}`}
              value={cards[index].front}
              onChange={(e) =>
                updateCardState(index, "front", e.currentTarget.value)
              }
              placeholder="Front"
            />

            <input
              id={`card-back-${index}`}
              value={cards[index].back}
              onChange={(e) =>
                updateCardState(index, "back", e.currentTarget.value)
              }
              placeholder="Back"
            />

            <button
              onClick={(e) => removeCard(e, index)}
              className="remove-card-button"
            >
              Remove Card
            </button>
          </div>
        ))}
        <div className="actions-container">
          <button onClick={addCardInputs}>Add a Card</button>
          <button type="submit">Create Quiz</button>
        </div>
      </form>
    </section>
  );
}
