import { createSlice } from "@reduxjs/toolkit";
import { addQuiz } from "../quizzes/quizzesSlice"; // Import the addQuiz action

// Initial state
const initialState = {
  topics: {},
};

// Creating the topics slice
const topicsSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {
    addTopic: (state, action) => {
      const { id, name, icon } = action.payload;
      state.topics[id] = {
        id,
        name,
        icon,
        quizIds: [], // Initialize with an empty array for quiz IDs
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addQuiz, (state, action) => {
      const { id, topicId } = action.payload;
      state.topics[topicId].quizIds.push(id); // Add the quiz ID to the topic's quizIds array
    });
  },
});

// Selector to get the topics
export const selectTopics = (state) => state.topics.topics;

// Export the action creator and reducer
export const { addTopic } = topicsSlice.actions;
export default topicsSlice.reducer;
