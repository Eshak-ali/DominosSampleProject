import React, { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Login from "../Register/Login/Login";
import Adminroute from "../admin/Adminroute";
import UserRouting from "../user/UserRouting";
import { useSelector } from "react-redux";
import { selectuser } from "../app/features/user/userSlice";

const Main = () => {
  const user = useSelector(selectuser);
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      navigate("/");
    } else if (user?.name === "admin") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user/*" element={<UserRouting />} />
      <Route path="/admin/*" element={<Adminroute />} />
    </Routes>
  );
};

export default Main;
