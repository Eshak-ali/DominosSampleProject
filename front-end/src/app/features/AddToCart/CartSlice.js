import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("Items")
  ? JSON.parse(localStorage.getItem("Items"))
  : {
      customerId: null,
      items: [],
      totalprice: 0,
      totalquantity: 0,
      location: null,
    };

export const Cartslice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add customer details
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
      localStorage.setItem("Items", JSON.stringify(state));
    },
    setorder: (state, action) => {
      const couter = action.payload;
      console.log(couter);
      state.ordernumber = couter;
    },
    setpayment: (state, action) => {
      state.payment = action.payload;
    },
    // Add a pizza to the cart
    addToCart: (state, action) => {
      const { id, name, price, quantity, image, type } = action.payload;

      // Check if the pizza is already in the cart
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        // Update quantity and total price for existing pizza
        existingItem.quantity += quantity;
        existingItem.totalPrice += price * quantity;
      } else {
        // Add a new pizza to the cart
        state.items.push({
          id,
          name,
          price,
          quantity,
          image,
          type,
          totalPrice: price * quantity,
        });
      }

      // Update global total price and quantity
      state.totalprice += price * quantity;
      state.totalquantity += quantity;

      localStorage.setItem("Items", JSON.stringify(state));
    },

    addLocation(state, action) {
      state.location = action.payload;
      localStorage.setItem("Items", JSON.stringify(state));
    },
    clearLocation(state) {
      state.location = null;
      localStorage.clear();
    },

    // Remove a pizza from the cart
    removeFromCart: (state, action) => {
      const each = action.payload;

      // Find the item to remove
      const existingItem = state.items.find((item) => item.id === each.id);

      if (existingItem) {
        // Update global total price and quantity
        state.totalprice -= existingItem.price;
        state.totalquantity -= 1;
        existingItem.quantity -= 1;
        existingItem.totalPrice -= existingItem.price;
        // Remove the item from the cart
        if (existingItem.quantity === 0) {
          state.items = state.items.filter((item) => item.id !== each.id);
        }
      }
      localStorage.setItem("Items", JSON.stringify(state));
    },

    // Clear the cart
    clearCart: (state) => {
      state.items = [];
      state.totalprice = 0;
      state.totalquantity = 0;
      localStorage.clear();
    },
  },
});

// Export reducers
export const {
  setCustomerId,
  addToCart,
  removeFromCart,
  clearCart,
  setorder,
  setpayment,
  addLocation,
  clearLocation,
} = Cartslice.actions;

export const selectallorder = (state) => state.cart;
export const selectItems = (state) => state.cart.items;
export const selectLoaction = (state) => state.cart.location;
export default Cartslice.reducer;
