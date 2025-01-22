import React from "react";
import { Route, Routes } from "react-router-dom";
import ListItem from "./listitem/ListItem";
import AdminNavbar from "./AdminNavbar";
import AddIitem from "./additem/Additem";
import OrderDetails from "./OrderDetails/OrderDetails";
const Adminroute = () => {
  return (
    <div>
      <Routes>
        <Route  element={<AdminNavbar />}>
          <Route path="/" element={<ListItem />} />
          <Route path="add" element={<AddIitem />} />
          <Route path="order" element={<OrderDetails />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Adminroute;
