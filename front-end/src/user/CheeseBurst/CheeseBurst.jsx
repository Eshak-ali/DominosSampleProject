import React, { useContext, useEffect, useState } from "react";
import Veg from "../../images/veg.jpg";
import NonVeg from "../../images/nonveg.jpg";
import { useSelector } from "react-redux";
import { selectpizza } from "../../app/features/pizza/pizza";
import { Pizza } from "../userContext/UserContext";
import { BsArrowLeft, BsPlus } from "react-icons/bs";
import { PiPizzaBold } from "react-icons/pi";
import { GiSlicedBread } from "react-icons/gi";
import "./cheeseburst.css";
import { Link } from "react-router-dom";
const CheeseBurst = () => {
  const pizza = useSelector(selectpizza);
  const [category, setcategory] = useState("Veg");
  const [menus, setMenu] = useState("pizza");
  const { handleAddToCart, handlepizza } = useContext(Pizza);

  useEffect(() => {
    handlepizza();
  }, []);

  const beverage = pizza.filter(
    (each) =>
      each.base === "Cheese Burst" &&
      each.category === category &&
      each.menu === menus
  );
  return (
    <div>
      <section
        className="position-fixed w-100 z-1"
        style={{ backgroundColor: "white" }}
      >
        <Link to="/user" className=" nav-link text-start pt-5 mt-4 pt-sm-0  mx-2">
          <BsArrowLeft />
          CheeseBurst
        </Link>
        <section className="row px-0">
          <ul className="menu-sides  my-0 px-0 mx-lg-5">
            <li onClick={() => setcategory("Veg")}>
              <img src={Veg} alt="veg" />
              Veg
            </li>
            <li onClick={() => setcategory("Non-Veg")}>
              <img src={NonVeg} alt="non-veg" />
              Non-Veg
            </li>
            <li onClick={() => setMenu("pizza")}>
              <PiPizzaBold />
              Pizza
            </li>
            <li onClick={() => setMenu("sides")}>
              <GiSlicedBread />
              Garlic Breads
            </li>
          </ul>
        </section>
      </section>
      <div className="pt-5"/>
      <h5 className="menu-title mt-5 pt-5 mt-sm-4 pt-sm-0 ">
        <div />
        <span>CheeseBurst</span>
        <div />
      </h5>
      <div className="container">
        <section className="card-box my-5 py-5 mt-2 pt-2">
          {beverage.length === 0 ? (
            <h1>We Don't have any items in CheeseBurst</h1>
          ) : (
            <>
              {beverage.map((each) => (
                <div className="pizza-card col-12 col-md-4">
                  <img src={each.imageUrl} alt="desserts" />
                  <div className="pizza-name col-12">
                    <section>
                      <img
                        src={each.category === "Veg" ? Veg : NonVeg}
                        alt={each.category}
                      />
                      {each.name}
                    </section>
                    <section className="description">
                      <p className="p-0">{each.description}</p>
                      <hr />
                    </section>
                    <section className="pizza-price col-12 px-2">
                      <span>₹{each.price}</span>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleAddToCart(each)}
                      >
                        Add
                        <BsPlus />
                      </button>
                    </section>
                  </div>
                </div>
              ))}
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default CheeseBurst;
