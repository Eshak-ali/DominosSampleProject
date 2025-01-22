import React from "react";
import { BsCart3, BsGeoAltFill, BsMenuUp } from "react-icons/bs";
import { PiPizzaBold } from "react-icons/pi";
import "./Footer.css";
import { Link } from "react-router-dom";
import { selectallorder } from "../../app/features/AddToCart/CartSlice";
import { useSelector } from "react-redux";
import { IoIosArrowForward } from "react-icons/io";
const Footer = () => {
  const cartItem = useSelector(selectallorder);
  return (
    <div className="col-12 footer">
      <ul className="footer-list nav p-0">
        <li>
          <Link to="/user/menu/pizza" className="nav-link">
            <BsMenuUp />
            Menu
          </Link>
        </li>
        {/* <li>
          <Link className="nav-link">
            <BsGeoAltFill />
            Pondicherry
          </Link>
        </li> */}
        <li>
          <Link className="nav-link" to="/user/cheeseburst">
            <PiPizzaBold />
            CheeseBurst
          </Link>
        </li>
        {cartItem.totalquantity === 0 ? (
          ""
        ) : (
          <li>
            <section className="add-cart  bg-danger p-0">
              <Link className="nav-link text-light px-1 py-0" to="/user/cart">
                <span className="position-relative fs-5">
                  <BsCart3 />
                </span>
                <span className="">{cartItem.totalquantity}</span>
                <span className="px-2">
                  View Cart
                  <span className="fs-5">
                    <IoIosArrowForward />
                  </span>
                </span>
              </Link>
            </section>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Footer;
