import React from "react";
import logo from "../../images/logo.png";
import "./Navbar.css";
import Footer from "../Footer/Footer";
import { Link, Outlet } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { clear } from "../../app/features/user/userSlice";
import { clearCart } from "../../app/features/AddToCart/CartSlice";
const HomePage = () => {
  const dispatch = useDispatch();

  const handlelogout = () => {
    dispatch(clear());
    dispatch(clearCart());
    dispatch(clear());
  };

  return (
    <div>
      <nav className="navbar col-12  bg-primary nav-fixed ">
        <div className="col-12  compnay-brand">
          <span className="Brand">
            <Link to="/user">
              <img src={logo} alt="logo" />
            </Link>
            <span className="navbar-brand fw-bold text-center text-light">
              Domino's Pizza
            </span>
          </span>

          <Link className="nav-link" to="/">
            <button className="btn btn-danger" onClick={handlelogout}>
              <LuLogOut />
              Logout
            </button>
          </Link>
        </div>
      </nav>
      <section className="mt-md-5">
        <Outlet />
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
