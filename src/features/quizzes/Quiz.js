import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams, Navigate } from "react-router-dom";
import Card from "../cards/Card";
import ROUTES from "../../app/routes";
import { selectQuizzes } from "./quizzesSlice"; // Import the quiz selector

export default function Quiz() {
  console.log("Quiz component is rendering");

  const quizzes = useSelector(selectQuizzes);
  console.log("Quizzes in state:", quizzes);

  const { quizId } = useParams();
  console.log("quizId from URL:", quizId);

  const quiz = quizzes[quizId];
  console.log("Quiz found:", quiz);

  if (!quiz) {
    console.log("No quiz found, redirecting...");
    return <Navigate to={ROUTES.quizzesRoute()} replace />;
  }

  return (
    <section>
      <h1>{quiz.name}</h1>
      <ul className="cards-list">
        {quiz.cardIds.map((id) => (
          <Card key={id} id={id} />
        ))}
      </ul>
      <Link to={ROUTES.newQuizRoute()} className="button center">
        Create a New Quiz
      </Link>
    </section>
  );
}
