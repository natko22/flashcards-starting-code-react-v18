import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  cards: {},
};

// Creating the cards slice
const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard: (state, action) => {
      const { id, front, back } = action.payload;
      state.cards[id] = {
        id,
        front,
        back,
      };
    },
  },
});

// Selector to get a card by its ID
export const selectCardById = (id) => (state) => state.cards.cards[id];

// Export the action creator and reducer
export const { addCard } = cardsSlice.actions;
export default cardsSlice.reducer;
