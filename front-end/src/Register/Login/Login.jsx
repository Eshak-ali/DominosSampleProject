import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { add } from "../../app/features/user/userSlice";
import logo from "../../images/logo.png";
import "./Login.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const Login = () => {
  const [login, setLogin] = useState(null);
  const [load, setload] = useState(true);
  const [visible, setVisible] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlenumber = (e) => {
    setLogin((prev) => ({ ...prev, number: Number(e.target.value) }));
  };

  const handlename = (e) => {
    const value = e.target.value;
    setLogin((prev) => ({ ...prev, name: value.trim("") }));
  };

  const handlepassword = (e) => {
    const value = e.target.value;
    setLogin((prev) => ({ ...prev, password: value }));
  };

  useEffect(() => {
    handleadmin();
  }, []);

  const handleadmin = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/admin/set_admin`
      );
      if (res.data) {
        console.log("admin success");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (login?.number.toString().length === 10) {
      setload(true);
      setInterval(() => {
        setVisible(false);
      }, 2000);
    } else if (login?.number.toString().length <= 9) {
      setload(false);
    }
  }, [login?.number]);

  const handlelogin = async () => {
    if (login.number === 9999999999) {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API}/admin/login`,
          login
        );
        console.log(res);

        if (res.data) {
          toast.success("admin Login Success", {
            position: "top-center",
          });
          dispatch(add(res.data));
          navigate("/admin");
        }
      } catch (error) {
        alert(error.message);
      }
    } else {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API}/user/login`,
          login
        );
        console.log(res);
        if (res.data) {
          console.log(res.data);
          dispatch(add(res.data));
          toast.success(`${res.data.name} login success`, {
            position: "bottom-right",
          });
          toast.dark(`click ${res.data.name} for details`);
          navigate("/user");
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };
  return (
    <div className="login">
     
      <section className="login-box mt-md-5 ">
        <section>
        <p>Admin:9999999999,Admin,1511</p>
          <Link to="/user" className="nav-link">
            <p
              className="text-primary text-end mx-5 mt-2"
              style={{ cursor: "pointer" }}
              onClick={() =>
                toast.info("pls update user details before order!", {
                  position: "top-right",
                })
              }
            >
              Skip
            </p>
          </Link>
        </section>
        <section className="container">
          <h3 className="text-info text-start Brand">
            <img src={logo} alt="logo" />
            Domino's Pizza
          </h3>
          <h4>Login to unloack awesome benefits</h4>

          <ul className="login-list">
            <li>
              <img />
              <p className="text-start">
                Personalized
                <br />
                <span className="text-start">Offers</span>
              </p>
            </li>
            <li>
              <img />
              <p className="text-start">
                Loyality
                <br />
                <span className="text-start">Rewards</span>
              </p>
            </li>
            <li>
              <img />
              <p className="text-start">
                Easy
                <br />
                <span className="text-start">Payments</span>
              </p>
            </li>
          </ul>
          <hr></hr>
        </section>
        <section className="input-wrapper container">
          <section>
            <label
              className="number-label text-dark d-none d-md-block mx-3"
              htmlFor="number"
            >
              Mobile Number
            </label>
            <input
              id="number"
              placeholder="+91 9999999999"
              value={login?.number}
              onChange={handlenumber}
              className={visible ? "number-input" : ""}
              maxLength={10}
            />
            <label className={load ? "" : "spinner-border mx-2 mt-1"}></label>
          </section>
          <section className={visible ? "show" : ""}>
            <label htmlFor="name" className="name-label">
              Name
            </label>
            <input
              id="name"
              placeholder="eg.Ram"
              value={login?.name}
              onChange={handlename}
            />
          </section>
          {login?.number === 9999999999 ? (
            <section className={visible ? "show" : ""}>
              <label htmlFor="password" className="password-label">
                Password
              </label>
              <input
                id="password"
                placeholder="*********"
                value={login?.password}
                onChange={handlepassword}
              />
            </section>
          ) : (
            <section className={visible ? "show" : ""}>
              <label htmlFor="password" className="password-label"></label>
              <input
                id="password"
                placeholder="*********"
                value={login?.password}
                hidden={login?.number === "0000000000" ? false : true}
              />
            </section>
          )}
        </section>
        <section>
          <button className="btn btn-dark mt-5 mb-2 w-75" onClick={handlelogin}>
            Set Login
          </button>
        </section>
      </section>
    </div>
  );
};

export default Login;
