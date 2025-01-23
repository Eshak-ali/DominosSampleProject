import React from "react";
import "./AdminNavbar.css";
import logo from "../images/logo.png";
import { BsPersonBadge } from "react-icons/bs";
import { LuLogOut } from "react-icons/lu";
import { Link, Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const AdminNavbar = () => {
  return (
    <div className="col-12 container-fluid p-0">
      <section className="col-12 navbar bg-primary">
        <h3 className="Brand text-center">
          <img src={logo} alt="logo" />
          Domino's Pizza
        </h3>
        <h2
          className="d-md-none"
          data-bs-toggle="offcanvas"
          data-bs-target="#staticBackdrop"
          aria-controls="staticBackdrop"
        >
          <FaBars />
        </h2>
        <Link to="/" className="nav-link">
          <button className="btn btn-danger d-none d-md-block mx-4">
            Logout
            <LuLogOut />
          </button>
        </Link>
      </section>
      <div className="row p-0 m-0 dashboard">
        <section className="col-2 sidebar d-none d-md-flex">
          <h2>
            <BsPersonBadge />
            Admin
          </h2>
          <ul className="navbar-nav">
            <Link to="/admin/add" className="nav-link">
              <li>Add Items</li>
            </Link>
            <Link to="/admin" className="nav-link">
              <li>List Items</li>
            </Link>
            <Link to="/admin/order" className="nav-link">
              <li>Order Details</li>
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
      <div
        className="offcanvas offcanvas-start bg-primary"
        data-bs-backdrop="static"
        tabIndex="-1"
        id="staticBackdrop"
        aria-labelledby="staticBackdropLabel"
      >
        <div className="offcanvas-header text-light">
          <h2 className="offcanvas-title" id="staticBackdropLabel">
            <BsPersonBadge />
            Admin
          </h2>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <section className="sidebars">
            <ul className="navbar-nav gap-5">
              <Link to="/admin/add" className="nav-link">
                <li data-bs-dismiss="offcanvas">Add Items</li>
              </Link>
              <Link to="/admin" className="nav-link">
                <li data-bs-dismiss="offcanvas">List Items</li>
              </Link>
              <Link to="/admin/order" className="nav-link">
                <li data-bs-dismiss="offcanvas">Order Details</li>
              </Link>
            </ul>
            <div>
              <button
                className="btn btn-danger w-100 d-flex align-items-center gap-2"
                id="log"
                data-bs-dismiss="offcanvas"
              >
                <Link to="/" className="nav-link">
                  Logout
                </Link>
                <LuLogOut />
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
