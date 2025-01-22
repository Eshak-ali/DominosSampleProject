import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pizza: [],
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    pizzaadd: {
      reducer(state, action) {
        if (state.length !== 0) {
          state.pizza = action.payload;
        }
      },
    },
  },
});

export const selectpizza = (state) => state.pizza.pizza;
export const { pizzaadd } = pizzaSlice.actions;
export default pizzaSlice.reducer;
