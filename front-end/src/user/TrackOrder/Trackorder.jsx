import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectuser } from "../../app/features/user/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import "./Track.css";
import { GiCancel, GiPizzaCutter } from "react-icons/gi";
import { FaShippingFast } from "react-icons/fa";
import { MdFoodBank } from "react-icons/md";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

const Trackorder = () => {
  const user = useSelector(selectuser);
  const [order, setOrder] = useState([]);
  const [pizza, setPizza] = useState([]);
  useEffect(() => {
    handletrackorder();
    console.log(order);
  }, []);

  const handletrackorder = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/order/track`,
        user
      );
      if (res.data) {
        const filter = res.data?.filter(
          (each) => each.status !== "cancelled" && each.status !== "delivered"
        );
        setOrder(filter);
        toast.success(`${filter.length} order recieved`, {
          position: "bottom-right",
        });
      } else {
        alert("no any orders");
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    handlepizza();
  }, [order]);

  const handlepizza = async () => {
    const items = order.map((item) => item?.items);
    const id = items?.flatMap((each) => each.map((item) => item.pizzaId));
    fetchpizza(id);
  };

  const fetchpizza = async (id) => {
    console.log(id);

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/pizza/orderpizza/${id}`
      );
      if (res.data) {
        setPizza(res.data);
      } else {
        alert("no pizza");
      }
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div className="mt-5 pt-4 ">
      <Link className="nav-link" to="/user">
        <h5 className="text-start mx-1">
          <BsArrowLeft /> My Order
        </h5>
      </Link>
      {order.length === 0 ? <h1>You Don't Order Anything</h1> : ""}
      <div className="container mt-5 track-order">
        {order.map((each) => (
          <div key={each._id} className="box">
            <section className="order-box mx-auto">
              <h4 className="text-start">#Order Number - {each.ordernumber}</h4>
              <hr></hr>

              <section>
                <span>{each?.comment}</span>
                <ul className="status p-0">
                  <li
                    className={
                      each.status === "cancelled" ? "cancelled" : "disable"
                    }
                  >
                    <GiCancel />
                    Cancel
                  </li>
                  <li
                    className={
                      each.status === "pending" ? "pending" : "disable"
                    }
                  >
                    <GiPizzaCutter />
                    Placed
                    <br />
                    <span>
                      {new Date(each.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </li>
                  <li
                    className={
                      each.status === "shipped" ? "shipped" : "disable"
                    }
                  >
                    shipped
                    <br />
                    <span>
                      {new Date(each.updatedAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <FaShippingFast />
                  </li>
                  <li
                    className={
                      each.status === "delivered" ? "delivered" : "disable"
                    }
                  >
                    Delivered
                    <br />
                    <span>
                      {new Date(each.updatedAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <MdFoodBank />
                  </li>
                </ul>
                <hr />
              </section>
              <section className="order-details">
                <section>
                  <h4>Order Details</h4>
                  <ul className="pizza p-0">
                    {pizza?.map((item) => {
                      const filteredItem = each.items.filter(
                        (pizzaItem) => pizzaItem.pizzaId === item._id
                      );
                      if (filteredItem.length > 0) {
                        return <li key={item._id}>{item.name}</li>;
                      }
                      return null;
                    })}
                  </ul>
                </section>
                <section>
                  <h4>Quantity</h4>
                  <ul className="pizza p-0">
                    {each.items.map((item) => (
                      <li>{item.quantity}</li>
                    ))}
                  </ul>
                </section>
                <section key={each.totalquantity}>
                  <h4>Total qauntity</h4>
                  <p>{each.totalquantity}</p>
                </section>
                <section key={each.totalPrice}>
                  <h4>Total Price</h4>
                  <p>{each.totalPrice}</p>
                </section>
                <section key={each.payment}>
                  <h4>Payment</h4>
                  <p
                    className={
                      each.payment === "CASH/UPI on Delivery"
                        ? "text-light fw-bold"
                        : "text-success"
                    }
                  >
                    {each.payment}
                  </p>
                </section>
              </section>
            </section>
          </div>
        ))}
      </div>
      <div className="mt-5 pt-5" />
      <div className="mt-5 pt-5 d-md-none" />
    </div>
  );
};

export default Trackorder;
