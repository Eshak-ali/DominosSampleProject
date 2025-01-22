import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../Register/Login/Login";
import Adminroute from "../admin/Adminroute";
import UserRouting from "../user/UserRouting";

const Main = () => {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user/*" element={<UserRouting />} />
        <Route path="/admin/*" element={<Adminroute />} />
      </Routes>
  );
};

export default Main;
