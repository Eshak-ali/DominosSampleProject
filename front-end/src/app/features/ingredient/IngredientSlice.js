import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredient: ["tomato Blend", "cheese"],
};
export const IngredientSlice = createSlice({
  name: "pizza_ingredient",
  initialState,
  reducers: {
    Add: {
      reducer(state, action) {
        state.ingredient.push(action.payload);
      },
    },
    deleteItem(state, action) {
      state.ingredient = state.ingredient.filter(
        (item) => item !== action.payload
      );
    },
  },
});

export const selectallingredient = (state) => state.pizza_ingredient.ingredient;
export const { Add, deleteItem } = IngredientSlice.actions;
export default IngredientSlice.reducer;
