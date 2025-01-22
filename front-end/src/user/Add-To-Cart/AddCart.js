import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  removeFromCart,
  selectallorder,
  selectLoaction,
  setCustomerId,
  setorder,
  setpayment,
} from "../../app/features/AddToCart/CartSlice";
import { IoMdArrowDropdown } from "react-icons/io";
import "./cart.css";
import { PiPizzaDuotone } from "react-icons/pi";
import { add, selectuser } from "../../app/features/user/userSlice";
import Veg from "../../images/veg.jpg";
import Nonveg from "../../images/nonveg.jpg";
import axios from "axios";
import { toast } from "react-toastify";
import { BsDash, BsGeoAltFill, BsGraphDownArrow, BsPlus } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { selectpizza } from "../../app/features/pizza/pizza";
import { Pizza } from "../userContext/UserContext";

const AddCart = () => {
  const dispatch = useDispatch();
  const pizza = useSelector(selectpizza);
  const location = useSelector(selectLoaction);
  const [randompizza, setRandompizza] = useState([]);
  const user = useSelector(selectuser);
  const [newuser, setNewuser] = useState(null);
  const order = useSelector(selectallorder);
  const [cash, setCash] = useState(false);
  const [isOrderSet, setIsOrderSet] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    name: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const { handleAddToCart } = useContext(Pizza);

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (order.length !== 0) {
      const shuffled = [...pizza].sort(() => Math.random() - 0.5); // Shuffle the array
      setRandompizza(shuffled.slice(0, 5)); // Pick the first 5 items
    }
  }, [setorder]);

  const completeorder = (each) => {
    handleAddToCart(each);
    if (order.length !== 0) {
      const shuffled = [...pizza].sort(() => Math.random() - 0.5); // Shuffle the array
      setRandompizza(shuffled.slice(0, 5)); // Pick the first 5 items
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      paymentDetails.name &&
      paymentDetails.cardNumber.length === 16 &&
      paymentDetails.expiryDate &&
      paymentDetails.cvv.length === 3
    ) {
      setPaymentSuccess(true);
      dispatch(setpayment("paymnet Success"));
    } else {
      alert("Please fill in all fields correctly.");
    }
  };

  const handlelogin = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/user/login`,
        newuser
      );
      console.log(res);
      if (res.data) {
        dispatch(add(res.data));
        toast.success(`${res.data.name} login success`, {
          position: "bottom-right",
        });
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const AddExtra = (each) => {
    dispatch(
      addToCart({
        id: each.id,
        name: each.name,
        price: each.price,
        quantity: 1,
        image: each.imageUrl,
        type: each.category,
      })
    );
  };

  const handleorder = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/order/lenght`);
      if (res.data) {
        const data = await res.data;
        console.log(data);
        if (cash || paymentSuccess) {
          dispatch(setorder(data));
          setIsOrderSet(true);
        } else {
          toast.warning("pls update payment deatils");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isOrderSet) {
      orderconfirm();
    }
  }, [isOrderSet]);

  const orderconfirm = async () => {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/order/add`,
      order
    );
    if (res.data) {
      console.log(res.data);

      toast.success(
        `order confirmed your order number ${res.data.ordernumber}`
      );
      dispatch(clearCart());
    }
  };

  const handlecash = () => {
    setCash(true);
    dispatch(setpayment("CASH/UPI on Delivery"));
  };

  return (
    <div className="container-sm py-5 px-0">
      <h1 className="text-center  mt-5 mt-sm-0">
        Your order
        <span className="text-warning">
          <PiPizzaDuotone />
        </span>
      </h1>
      <div className="order-type">
        {location !== null &&
        location !== "Dine-in" &&
        location !== "Takeaway" ? (
          <>
            <h4>
              Delivery
              <span className="mx-4">
                <IoMdArrowDropdown />
              </span>
            </h4>
            <span className="address mx-auto">Address:<br/>{location}</span>
          </>
        ) : location === "Takeaway" ? (
          <h4>
            {location}
            <span className="mx-4">
              <IoMdArrowDropdown />
            </span>
          </h4>
        ) : location === "Dine-in" ? (
          <h4>
            {location}
            <span className="mx-4">
              <IoMdArrowDropdown />
            </span>
          </h4>
        ) : (
          <h4>Pls select Order Type</h4>
        )}
      </div>
      <div className="product-box">
        {order.items.length === 0 ? (
          <h2 className="my-5">Your Cart Is Empty</h2>
        ) : (
          <>
            {order.items?.map((each) => (
              <div className="product col-12 text-center mt-3" key={each.id}>
                <section className="col-5 col-md-3 product-name">
                  <img
                    className="mx-2 d-none d-md-block"
                    src={each.image}
                    alt={each.name}
                  />
                  <img
                    className=" d-block d-md-none w-25"
                    src={each.type === "Veg" ? Veg : Nonveg}
                  />
                  <span className="m-0 fs-5">{each.name}</span>
                </section>
                <section className="col-2 col-md-3">
                  <span>{each.price}</span>
                </section>
                <section className="col-3 col-md-3 quantity">
                  <button
                    className="btn "
                    onClick={() => dispatch(removeFromCart(each))}
                  >
                    <BsDash />
                  </button>
                  <h5>{each.quantity}</h5>
                  <button className="btn " onClick={() => AddExtra(each)}>
                    <BsPlus />
                  </button>
                </section>
                <section className="col-2 col-md-3">
                  <span>{each.totalPrice}</span>
                </section>
              </div>
            ))}
            <div className="text-end total-price mt-4 gap-4 gap-md-2">
              <span>
                <Link to="/user/menu" className="text-dark nav-link">
                  Add more Items....
                </Link>
              </span>
              <h5></h5>
              <h4>Total_Price</h4>
              <h3>{order.totalprice}</h3>
            </div>
          </>
        )}
      </div>
      <h4 className="mt-4">Complete Your Meal</h4>
      <br />
      <div className="complete-order">
        {randompizza.map((each) => (
          <div className="pizza-complete col-12 col-md-4">
            <img src={each.imageUrl} alt="desserts" className="img-complete" />
            <div className="pizza-name-order col-12">
              <section>
                <img
                  src={each.category === "Veg" ? Veg : Nonveg}
                  alt={each.category}
                />
                {each.name}
              </section>
              {/* <section className="description">
                  <p className="p-0">{each.description}</p>
                  <hr />
                </section> */}
              <section className="pizza-price-complete col-12 px-2">
                <span>₹{each.price}</span>
                <button
                  className="btn btn-danger"
                  onClick={() => completeorder(each)}
                >
                  Add
                  <BsPlus />
                </button>
              </section>
            </div>
          </div>
        ))}
      </div>
      <section className="text-end my-5 cart-btn">
        <button
          className="btn btn-danger"
          onClick={() => dispatch(clearCart())}
        >
          Clear Cart
        </button>
        {user === null ? (
          <button
            className="btn btn-info text-light"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal1"
          >
            Pls Give your Details
          </button>
        ) : (
          <button
            className="btn-danger btn my-5 d-flex"
            style={{ alignItems: "center", gap: "5px" }}
            data-bs-toggle="modal"
            data-bs-target="#pay"
            disabled={order.items.length === 0 ? true : false}
          >
            <span>Pay ₹{order.totalprice}</span>
            <IoIosArrowForward />
          </button>
        )}
      </section>
      <Link to="/user/track">
        <span className="text-end">
          {" "}
          Track order...
          <BsGeoAltFill />
        </span>
      </Link>
      <div
        class="modal fade"
        id="exampleModal1"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                User Details
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <section>
                <label>Name:</label>
                <input
                  name="name"
                  value={newuser?.name}
                  type="text"
                  onChange={(e) =>
                    setNewuser((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </section>
              <section>
                <label>Number:</label>
                <input
                  name="number"
                  maxLength={10}
                  value={newuser?.number}
                  onChange={(e) =>
                    setNewuser((prev) => ({
                      ...prev,
                      number: Number(e.target.value),
                    }))
                  }
                />
              </section>
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
                onClick={handlelogin}
                data-bs-dismiss="modal"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* model for payment */}
      <div
        class="modal fade"
        id="pay"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Payment
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div
                style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}
              >
                <h2>Payment Page</h2>
                {cash ? (
                  <>
                    <div style={{ textAlign: "center" }}>
                      <h3>Order Confirmed! 🎉</h3>
                      <p>Pls Pay on Delivery.</p>
                      <span>Click save to continue</span>
                    </div>
                  </>
                ) : (
                  <>
                    {paymentSuccess ? (
                      <div style={{ textAlign: "center" }}>
                        <h3>Payment Successful! 🎉</h3>
                        <p>Thank you for your payment.</p>
                      </div>
                    ) : (
                      <>
                        <form onSubmit={handleSubmit}>
                          <div style={{ marginBottom: "15px" }}>
                            <label>
                              Name on Card:
                              <input
                                type="text"
                                name="name"
                                value={paymentDetails.name}
                                onChange={handleInputChange}
                                placeholder="John Doe"
                                required
                                style={{
                                  width: "100%",
                                  padding: "10px",
                                  marginTop: "5px",
                                }}
                              />
                            </label>
                          </div>
                          <div style={{ marginBottom: "15px" }}>
                            <label>
                              Card Number:
                              <input
                                type="text"
                                name="cardNumber"
                                value={paymentDetails.cardNumber}
                                onChange={handleInputChange}
                                placeholder="1234 5678 9101 1121"
                                required
                                maxLength="16"
                                style={{
                                  width: "100%",
                                  padding: "10px",
                                  marginTop: "5px",
                                }}
                              />
                            </label>
                          </div>
                          <div style={{ marginBottom: "15px" }}>
                            <label>
                              Expiration Date:
                              <input
                                type="text"
                                name="expiryDate"
                                value={paymentDetails.expiryDate}
                                onChange={handleInputChange}
                                placeholder="MM/YY"
                                required
                                style={{
                                  width: "100%",
                                  padding: "10px",
                                  marginTop: "5px",
                                }}
                              />
                            </label>
                          </div>
                          <div style={{ marginBottom: "15px" }}>
                            <label>
                              CVV:
                              <input
                                type="password"
                                name="cvv"
                                value={paymentDetails.cvv}
                                onChange={handleInputChange}
                                placeholder="123"
                                required
                                maxLength="3"
                                style={{
                                  width: "100%",
                                  padding: "10px",
                                  marginTop: "5px",
                                }}
                              />
                            </label>
                          </div>
                          <button
                            type="submit"
                            style={{
                              backgroundColor: "#4CAF50",
                              color: "white",
                              padding: "10px",
                              border: "none",
                              width: "100%",
                              cursor: "pointer",
                            }}
                          >
                            Pay Now
                          </button>
                        </form>
                        <h3 className="mt-3">(or)</h3>
                        <section className="cash">
                          <input
                            type="radio"
                            name="cash"
                            id="cash"
                            onChange={handlecash}
                          />
                          <label htmlFor="cash">Cash / UPI on Delivery</label>
                        </section>
                      </>
                    )}
                  </>
                )}
              </div>
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
                onClick={handleorder}
                data-bs-dismiss="modal"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* 

 

 
    
 */}
    </div>
  );
};

export default AddCart;
