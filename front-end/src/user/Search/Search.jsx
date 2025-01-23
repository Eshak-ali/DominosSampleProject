import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BsArrowLeft, BsPlus, BsSearch } from "react-icons/bs";
import Veg from "../../images/veg.jpg";
import NonVeg from "../../images/nonveg.jpg";
import { selectpizza } from "../../app/features/pizza/pizza";
import { Pizza } from "../userContext/UserContext";
import "./search.css";
import { Link } from "react-router-dom";

const Search = () => {
  const pizza = useSelector(selectpizza);
  const { handleAddToCart, handlepizza } = useContext(Pizza);
  const [search, setSearch] = useState("");

  const [item, setItem] = useState([]);

  useEffect(() => {
    handlepizza();
  }, []);

  const handlesearch = (each) => {
    const value = each.target.value.toLowerCase();
    setSearch(value);

    const filter = pizza.filter((each) =>
      each.name.toLowerCase().includes(value)
    );

    setItem(filter);
    console.log(filter);
  };

  return (
    <div className="mt-5 pt-5 ">
      <div className="position-fixed w-100 z-1">
        <Link to="/user">
          <BsArrowLeft />
        </Link>
        <input
          type="text"
          onChange={handlesearch}
          placeholder="search Pizzas, Sides & more"
          className="search-input"
        />
        <span className="search-icon">
          <BsSearch />
        </span>
      </div>
      <div>
        <section className="card-box my-5 py-5 mt-5 pt-2">
          {item.length === 0 ? (
            ""
          ) : (
            <>
              {item.map((each) => (
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

export default Search;
