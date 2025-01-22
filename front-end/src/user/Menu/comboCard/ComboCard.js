import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectpizza } from "../../../app/features/pizza/pizza";
import { BsPlus } from "react-icons/bs";
import Veg from "../../../images/veg.jpg";
import NonVeg from "../../../images/nonveg.jpg";
import { useOutletContext } from "react-router-dom";
import { Pizza } from "../../userContext/UserContext";
const ComboCard = () => {
  const pizza = useSelector(selectpizza);
  const { category } = useOutletContext();
  const { handleAddToCart } = useContext(Pizza);
  
  const combo = pizza.filter(
    (each) => each.menu === "combo" && each.category === category
  );

  return (
    <div className="mt-5 pt-5">
      <h5 className="menu-title mt-1 "><div/><span>Combo</span><div/></h5>
      <div className="container" >
        <section className="card-box my-5 py-5 mt-2 pt-2">
          {combo.length === 0 ? (
            <h1>We Don't have any {category} items in Beverage</h1>
          ) : (
            <>
              {combo.map((each) => (
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

export default ComboCard;
