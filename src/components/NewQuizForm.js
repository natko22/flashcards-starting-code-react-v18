import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ROUTES from "../app/routes";
import { selectTopics } from "../features/topics/topicsSlice"; // Import topics selector
import { addQuiz } from "../features/quizzes/quizzesSlice"; // Import addQuiz action

export default function NewQuizForm() {
  const [name, setName] = useState("");
  const [topicId, setTopicId] = useState("");
  const navigate = useNavigate();
  const topics = useSelector(selectTopics); // Fetch topics from the state
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0 || topicId.length === 0) {
      return;
    }

    const quizId = uuidv4(); // Generate a unique ID for the quiz

    // Dispatch addQuiz action with the necessary payload
    dispatch(
      addQuiz({
        id: quizId,
        name,
        topicId,
        cardIds: [], // Empty array for card IDs for now
      })
    );

    // Redirect to the quizzes page after creation
    navigate(ROUTES.quizzesRoute());
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
          onChange={(e) => setTopicId(e.currentTarget.value)}
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
        <div className="actions-container">
          <button type="submit">Create Quiz</button>
        </div>
      </form>
    </section>
  );
}
