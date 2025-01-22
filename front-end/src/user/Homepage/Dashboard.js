import React, { useState } from "react";
import "./Dashboard.css";
import {
  BsCart4,
  BsCreditCard2Front,
  BsGeo,
  BsGeoAltFill,
  BsPersonFill,
  BsReceiptCutoff,
  BsSearch,
} from "react-icons/bs";
import { GrLocation } from "react-icons/gr";
import { clear, selectuser } from "../../app/features/user/userSlice";
import chesseburst from "../../images/craving/cheeseburst.jpg";
import beverage from "../../images/craving/beverages.jpg";
import cheesevalcono from "../../images/craving/cheesevalcono.jpg";
import combo from "../../images/craving/combo.jpg";
import desserts from "../../images/craving/desserts.jpg";
import garlic from "../../images/craving/garlicbread.jpg";
import pizzamania from "../../images/craving/pizzamania.jpg";
import cheesiken from "../../images/craving/cheesiken.jpg";
import arrival from "../../images/craving/newarrival.png";
import chickenfiesta from "../../images/craving/chickenfiesta.jpg";
import veg from "../../images/craving/vegpizza.jpg";
import bulk from "../../images/news/bulk.jpg";
import cheese from "../../images/news/cheeseburst.jpg";
import cheesy from "../../images/news/chssesvolcano.jpg";
import choco from "../../images/news/chockolava.jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PiPersonArmsSpreadFill, PiPizzaFill } from "react-icons/pi";
import { GiCartwheel, GiFullPizza } from "react-icons/gi";
import { LuLogOut } from "react-icons/lu";
import Ads from "../Ads/Ads";

import {
  addLocation,
  clearCart,
  clearLocation,
  selectLoaction,
} from "../../app/features/AddToCart/CartSlice";

const Dashboard = () => {
  const user = useSelector(selectuser);
  const dispatch = useDispatch();
  const location = useSelector(selectLoaction);
  const [address, setAddress] = useState();

  const handleclear = () => {
    dispatch(clear());
    dispatch(clearLocation());
    dispatch(clearCart());
  };

  const handleaddress = (e) => {
    const value = e.target.value;
    setAddress(value);
  };

  return (
    <div className=" dashboard">
      <div className="col-11  col-md-6  d-md-flex mx-auto mt-5 pt-3 pt-sm-0">
        <div className="list col-12 mt-5">
          <span>
            <GrLocation />
            Pondicherry
          </span>
          <h4
            className="person"
            data-bs-toggle="offcanvas"
            href="#offcanvasExample"
            role="button"
            aria-controls="offcanvasExample"
          >
            <PiPersonArmsSpreadFill />
            {user?.name ? user.name : "Guest"}
          </h4>
          <Link className="nav-link" to="/user/search">
            <BsSearch />
            <span className="d-inline-flex gap-4">Search</span>
          </Link>
        </div>
      </div>
      <ul className="place-tab">
        <li
          style={{
            backgroundColor:
              location !== "Takeaway" && "Dine-in" && null
                ? "black"
                : "transparent",
            color:
              location !== "Takeaway" && "Dine-in" && null ? "white" : "black",
            cursor: "pointer",
          }}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <span className="fw-bold">Delivery</span>
        </li>
        <li
          onClick={() => dispatch(addLocation("Takeaway"))}
          style={{
            backgroundColor: location === "Takeaway" ? "black" : "transparent",
            color: location === "Takeaway" ? "white" : "black",
            cursor: "pointer",
          }}
        >
          <span className="fw-bold">Takeaway</span>
          <span></span>
        </li>
        <li
          onClick={() => dispatch(addLocation("Dine-in"))}
          style={{
            backgroundColor: location === "Dine-in" ? "black" : "transparent",
            color: location === "Dine-in" ? "white" : "black",
            cursor: "pointer",
          }}
        >
          <span className="fw-bold">Dine-in</span>
          <span></span>
        </li>
      </ul>

      <div>
        <ul className="mt-3 banner p-0">
          <Link className="nav-link" to="menu/combo">
            <li>
              <img src={bulk} alt="image" />
            </li>
          </Link>
          <Link className="nav-link" to="cheeseburst">
            <li>
              <img src={cheese} alt="image" />
            </li>
          </Link>
          <Link className="nav-link" to="menu/Cheese Volcano">
            <li>
              <img src={cheesy} alt="image" />
            </li>
          </Link>
          <Link className="nav-link" to="menu/desserts">
            <li>
              <img src={choco} alt="image" />
            </li>
          </Link>
        </ul>
      </div>
      <Ads />
      <div className="categories mt-2">
        <h5 className="text-start text-secondary">What are you craving for?</h5>
        <div className="categories-img">
          <Link className="nav-link" to="cheeseburst">
            <span>
              <img src={chesseburst} alt="product image" />
              Cheese Burst Pizza
            </span>
          </Link>
          <Link className="nav-link" to="menu/pizza">
            <span>
              <img src={veg} alt="product image" />
              Veg pizza
            </span>
          </Link>
          <Link className="nav-link" to="menu/beverage">
            <span>
              <img src={beverage} alt="product image" />
              Beverages
            </span>
          </Link>
          <Link className="nav-link" to="menu/Cheese Volcano">
            <span>
              <img src={cheesevalcono} alt="product image" />
              Cheese Valcono
            </span>
          </Link>
          <Link className="nav-link" to="menu/combo">
            <span>
              <img src={combo} alt="product image" />
              Combo
            </span>
          </Link>
          <Link className="nav-link" to={"menu/desserts"}>
            <span>
              <img src={desserts} alt="product image" />
              Desserts
            </span>
          </Link>
          <Link className="nav-link" to="menu/Garlic Bread">
            <span>
              <img src={garlic} alt="product image" />
              Garlic Bread
            </span>
          </Link>
          <Link className="nav-link" to="menu/pizzaMania">
            <span>
              <img src={pizzamania} alt="product image" />
              Pizza Mania
            </span>
          </Link>
        </div>
        <section className="my-5">
          <img src={arrival} alt="new arriaval" width="150px" />
        </section>

        <section className="container mx-auto">
          <div
            id="carouselExample"
            class="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="2000"
          >
            <div class="carousel-inner">
              <div class="carousel-item active">
                <Link className="nav-link" to="menu/cheesiken">
                  <img src={cheesiken} class="d-block w-100" alt="..." />
                </Link>
              </div>
              <div class="carousel-item">
                <Link className="nav-link" to="menu/Chicken Fiesta">
                  <img src={chickenfiesta} class="d-block w-100" alt="..." />
                </Link>
              </div>
              <div class="carousel-item">
                <Link className="nav-link" to="menu/Cheese Volcano">
                  <img src={cheesy} class="d-block w-100" alt="..." />
                </Link>
              </div>
            </div>
          </div>
        </section>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      {/* side-bar */}
      <div
        class="offcanvas offcanvas-start"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div class="offcanvas-body p-0">
          <div className="w-100 p-3 user-details">
            <h3 className="text-light">
              {" "}
              <BsPersonFill />
            </h3>
            <div>
              <span>{user?.name ? user.name : "Guest"}</span>
              <span>{user?.number}</span>
            </div>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div>
            <ul className="menu-item mt-4">
              <Link className="nav-link" to="/user">
                <li>
                  <BsCreditCard2Front />
                  Dashboard
                </li>
              </Link>
              <Link className="nav-link" to="/user/menu">
                <li>
                  <BsReceiptCutoff />
                  Menu
                </li>
              </Link>
              <Link className="nav-link" to="/user/cheeseburst">
                <li>
                  <PiPizzaFill />
                  cheeseburst
                </li>
              </Link>
              <li>
                <BsGeoAltFill />
                Pondicherry
              </li>
            </ul>
            <hr />
          </div>
          <div>
            <ul className="menu-item mt-2">
              <Link className="nav-link" to="/user/track">
                <li>
                  <BsGeo />
                  Track Order
                </li>
              </Link>
              <Link className="nav-link" to="/user/history">
                <li>
                  <GiFullPizza />
                  Order History
                </li>
              </Link>
              <Link className="nav-link" to="/user/cart">
                {" "}
                <li>
                  <GiCartwheel />
                  Cart_____
                  <BsCart4 />
                </li>
              </Link>
            </ul>
            <hr />
          </div>
          <section className="logout">
            <Link
              to="/"
              className="nav-link bg-danger p-2 text-light rounded-2"
              onClick={handleclear}
            >
              <LuLogOut />
              Logout
            </Link>
          </section>
        </div>
      </div>
      <div className="py-5" />
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Delivery Available for 10 to 15 km only from store
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <textarea onChange={handleaddress} type="text" />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => dispatch(addLocation(address))}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
