import { createSlice } from "@reduxjs/toolkit";

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
});

// Selector to get the topics
export const selectTopics = (state) => state.topics.topics;

// Export the action creator and reducer
export const { addTopic } = topicsSlice.actions;
export default topicsSlice.reducer;
