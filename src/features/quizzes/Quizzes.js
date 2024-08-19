import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectQuizzes } from "./quizzesSlice";
import ROUTES from "../../app/routes";

export default function Quizzes() {
  const quizzes = useSelector(selectQuizzes); // Fetch all quizzes from the state

  return (
    <section>
      <h1>All Quizzes</h1>
      <ul>
        {Object.values(quizzes).map((quiz) => (
          <li key={quiz.id}>
            <Link to={ROUTES.quizRoute(quiz.id)}>{quiz.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
