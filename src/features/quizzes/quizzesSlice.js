import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  quizzes: {},
};

// Creating the quizzes slice
const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, action) => {
      const { id, name, topicId, cardIds } = action.payload;
      state.quizzes[id] = {
        id,
        name,
        topicId,
        cardIds,
      };
    },
  },
});

// Selector to get the quizzes
export const selectQuizzes = (state) => state.quizzes.quizzes;

// Export the action creator and reducer
export const { addQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;
