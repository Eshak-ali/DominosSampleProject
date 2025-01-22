import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectuser } from "../../app/features/user/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { GiCancel, GiPizzaCutter } from "react-icons/gi";
import { FaShippingFast } from "react-icons/fa";
import { MdFoodBank } from "react-icons/md";
import {
  addToCart,
  setCustomerId,
} from "../../app/features/AddToCart/CartSlice";

const OrderHistory = () => {
  const user = useSelector(selectuser);
  const dispatch = useDispatch();
  const [order, setOrder] = useState([]);
  const [pizza, setPizza] = useState([]);

  useEffect(() => {
    handletrackorder();
  }, []);

  const handletrackorder = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/order/track`,
        user
      );
      if (res.data) {
        const filter = res.data?.filter(
          (each) => each.status !== "shipped" && each.status !== "pending"
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

  const handlereorder = (each) => {
    const pizzaId = each.items.map((each) => each.pizzaId);
    const items = pizza.filter((item) => pizzaId.includes(item._id));
    console.log(items);
    if (items.length > 0) {
      // Check if the array is not empty
      items.forEach((item) => {
        // Iterate over the filtered items
        dispatch(
          addToCart({
            id: item._id,
            name: item.name,
            price: item.price,
            quantity: 1,
            image: item.imageUrl,
            type: item.category,
          })
        );
      });
    } else {
      console.log("No matching items found in the pizza array.");
    }
    dispatch(setCustomerId(user?._id));
  };
  return (
    <div>
      <div className="mt-4 pt-4">
        <Link className="nav-link" to="/user">
          <h5 className="text-start mx-1">
            <BsArrowLeft />
            Order History
          </h5>
        </Link>
        {order.length === 0 ? <h1>You Don't Order Anything</h1> : ""}
        <div className="container mt-5 track-order">
          {order.map((each) => (
            <div key={each._id} className="box">
              <section className="order-box mx-auto">
                <h4 className="text-start">
                  #Order Number - {each.ordernumber}
                </h4>
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
                      <br />
                      <span>
                        {new Date(each.updatedAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
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
                  <Link className="nav-link" to="/user/cart">
                    <button
                      className="btn btn-danger text-light"
                      onClick={() => handlereorder(each)}
                    >
                      Re_order
                    </button>
                  </Link>
                </section>
              </section>
            </div>
          ))}
        </div>
        <div className="mt-5 pt-5" />
        <div className="mt-5 pt-5 d-md-none" />
      </div>
    </div>
  );
};

export default OrderHistory;
