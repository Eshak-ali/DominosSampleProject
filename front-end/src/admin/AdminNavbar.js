import React from "react";
import "./AdminNavbar.css";
import logo from "../images/logo.png";
import { BsPersonBadge } from "react-icons/bs";
import { LuLogOut } from "react-icons/lu";
import { Link, Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const AdminNavbar = () => {
  const handlesidebar = () => {
    const menu = document.getElementById("sidebar");
    const logout = document.getElementById("log");
    menu.classList.toggle("sidebar-mobile");
    menu.classList.toggle("d-none");
    logout.classList.toggle("d-none");
  };
  return (
    <div className="col-12 container-fluid p-0">
      <section className="col-12 navbar bg-primary">
        <h3 className="Brand text-center">
          <img src={logo} alt="logo" />
          DUmino's Pizza
        </h3>
        <h2 className="d-md-none" onClick={handlesidebar}>
          <FaBars />
        </h2>
        <Link to="/" className="nav-link">
          <button className="btn btn-danger d-none d-md-block mx-4">
            Logout
            <LuLogOut />
          </button>
        </Link>
      </section>
      <div className=" row  p-0 m-0 dashboard">
        <section
          className="col-5 col-sm-2 sidebar d-none d-md-flex"
          id="sidebar"
        >
          <h2>
            <BsPersonBadge />
            Admin
          </h2>
          <ul className="navbar-nav">
            <Link to="/admin/add" className="nav-link">
              <li>
                Add Items
                <span className="d-md-none" onClick={handlesidebar}></span>
              </li>
            </Link>
            <Link to="/admin" className="nav-link">
              <li>
                List Items
                <span className="d-md-none" onClick={handlesidebar}></span>
              </li>
            </Link>
            <Link to="/admin/order" className="nav-link">
              <li>
                Order Details
                <span className="d-md-none" onClick={handlesidebar}></span>
              </li>
            </Link>
          </ul>
          <div>
            <button className="btn btn-danger d-none" id="log">
              <Link to="/" className="nav-link">
                Logout
              </Link>
              <LuLogOut />
            </button>
          </div>
        </section>
        <section className="col-12 col-sm-10 content">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default AdminNavbar;
