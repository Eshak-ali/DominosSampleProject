import React, { useContext, useEffect, useState } from "react";
import { BsArrowLeft, BsSearch } from "react-icons/bs";
import { Link, Outlet } from "react-router-dom";
import "../Menu/Menu.css";
import axios from "axios";
import Veg from "../../images/veg.jpg";
import NonVeg from "../../images/nonveg.jpg";
import { ScrollNavigation } from "../userContext/ScrollContext";
import { Pizza } from "../userContext/UserContext";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [category, setcategory] = useState("Veg");
  const { handlepizza } = useContext(Pizza);
  const { bottomRef } = useContext(ScrollNavigation);

  useEffect(() => {
    handlemenu();
    handlepizza();
  }, []);

  const handlemenu = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API}/pizza/menu`);
    if (res.data) {
      setMenu(res.data);
    }
  };

  return (
    <div>
      <div className="z-1 position-fixed w-100 menu-top pt-4">
        <div className="menu-category">
          <section className="text-start d-flex justify-content-between mx-2">
            <Link to="/user" className="fw-bold nav-link  mt-md-1 mx-1 ">
              <BsArrowLeft />
              Dumino's Menu
            </Link>
            <Link className="nav-link  search" to="/user/search">
              <BsSearch />
            </Link>
          </section>
          <section className="row px-0">
            <ul className="category mx-5 my-0 px-0 mx-lg-5">
              <li onClick={() => setcategory("Veg")}>
                <img src={Veg} alt="veg" />
                Veg
              </li>
              <li onClick={() => setcategory("Non-Veg")}>
                <img src={NonVeg} alt="non-veg" />
                Non-Veg
              </li>
            </ul>
            <hr />
            <section className="row">
              <ul className="col-12 menu">
                {menu.map((item) => (
                  <Link to={item} className="nav-link">
                    <li>
                      {item}
                      {item === "sides" ? "& more" : ""}
                    </li>
                  </Link>
                ))}
              </ul>
              <hr />
            </section>
          </section>
        </div>
      </div>
      {/* <div 
        ref={topRef}
        style={{ height: "9vh", background: "transparent" ,visibility:"hidden"}}
      ></div> */}
      <section className="mt-5 pt-5">
        <Outlet context={{ category }} />
      </section>
      <div
        ref={bottomRef}
        style={{ height: "10vh", background: "transparent" }}
      ></div>
    </div>
  );
};

export default Menu;
