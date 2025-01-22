import { createContext, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectuser } from "../../app/features/user/userSlice";
import {
  addToCart,
  selectallorder,
  setCustomerId,
} from "../../app/features/AddToCart/CartSlice";
import { toast } from "react-toastify";
import { pizzaadd } from "../../app/features/pizza/pizza";
import axios from "axios";

export const Pizza = createContext();
const UserContext = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectuser);
  const cartItems = useSelector(selectallorder);


  //   add to cart
  const handleAddToCart = (each) => {
    dispatch(
      addToCart({
        id: each._id,
        name: each.name,
        price: each.price,
        quantity: 1,
        image: each.imageUrl,
        type: each.category,
      })
    );
    dispatch(setCustomerId(user?._id));
    const item = cartItems.items.filter((item) => item.name === each.name);
    console.log(item[0]);

    if (item.length !== 0) {
      toast.success(
        `${each.name} added ${item[0].quantity + 1} times to cart `
      );
    } else {
      toast.success(`${each.name} added to cart`);
    }
  };
  //

  const handlepizza = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API}/pizza/all`);
    if (res.data) {
      const pizza = res.data;
      dispatch(pizzaadd(pizza));
    }
  };

  return (
    <div>
      <Pizza.Provider value={{ handleAddToCart, handlepizza }}>
        {children}
      </Pizza.Provider>
    </div>
  );
};

export default UserContext;
