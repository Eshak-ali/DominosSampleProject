import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : {
      user: null,
    };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    add(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state));
    },
    clear(state) {
      state.user = null;
      localStorage.clear();
    },
  },
});

export const selectuser = (state) => state.user.user;
export const { add, clear } = userSlice.actions;
export default userSlice.reducer;
