import { configureStore } from "@reduxjs/toolkit";
import ingreidentReducer from "./features/ingredient/IngredientSlice";
import userSliceReducer from "./features/user/userSlice";
import pizzaReducer from "./features/pizza/pizza";
import CartReducer from "./features/AddToCart/CartSlice";

export const store = configureStore({
  reducer: {
    pizza_ingredient: ingreidentReducer,
    user: userSliceReducer,
    pizza: pizzaReducer,
    cart: CartReducer,
  },
});
