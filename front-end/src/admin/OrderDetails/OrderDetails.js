import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "./orderDetails.css";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const [order, setOrder] = useState([]);
  const [user, setUser] = useState([]);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState([]);
  const [OrderDetails, setOrderDetails] = useState("");
  const [pizza, setPizza] = useState([]);

  const column = [
    {
      name: "Customer Name",
      cell: (row) => {
        const customername = user.find((each) => each._id === row.customerId);
        return customername ? <span>{customername.name}</span> : null;
      },
      width: "140px",
    },
    {
      name: "Number",
      cell: (row) => {
        const customername = user.find((each) => each._id === row.customerId);
        return customername ? <span>{customername.number}</span> : null;
      },
      width: "140px",
    },
    {
      name: "Order No",
      selector: (row) => row.ordernumber,
      sortable: true,
    },
    {
      name: "Order Details",
      width: "200px",
      cell: (row) => (
        <ul className="pizza p-0">
          {pizza?.map((item) => {
            const filteredItem = row.items.filter(
              (pizzaItem) => pizzaItem.pizzaId === item._id
            );
            if (filteredItem.length > 0) {
              return <li key={item._id}>{item.name}</li>;
            }
            return null;
          })}
        </ul>
      ),
    },
    {
      name: "quantity",
      cell: (row) => (
        <ul className="pizza p-0">
          {row.items.map((item) => (
            <li>{item.quantity}</li>
          ))}
        </ul>
      ),
    },
    {
      name: "Location",
      selector: (row) => row?.location,
    },
    {
      name: "order time",
      cell: (row) => (
        <span>
          {new Date(row.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      ),
    },
    {
      name: "Payment",
      selector: (row) => row.payment,
      wrap: true,
    },

    {
      name: "Updates",
      cell: (row) => (
        <span>
          {row.status}
          <br />
          {new Date(row.updatedAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      ),
    },
    {
      name: "",
      width: "200px",
      cell: (row) => (
        <button
          className={`btn btn-warning button `}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => setOrderDetails((prev) => ({ ...prev, _id: row._id }))}
          disabled={
            row.status === "cancelled" ||
            row.status === "delivered" ||
            user === null
              ? true
              : false
          }
        >
          <span className={`${row.status}`}>{row.status}</span>
        </button>
      ),
    },
  ];

  useEffect(() => {
    handleorder();
    handlestatus();
  }, []);

  useEffect(() => {
    if (order.length !== 0) {
      const filter = order.filter(
        (each) => each.status !== "cancelled" && each.status !== "delivered"
      );
      setData(filter);
    }
    handleuser();
  }, [order]);

  const handleorder = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/order/all`);
      if (res.data) {
        setOrder(res.data);
        console.log(order);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlestatus = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/order/status`);
      if (res.data) {
        setStatus(res.data);
      }
    } catch (error) {
      alert(error);
    }
  };

  const statuschange = (e) => {
    const value = e.target.value;
    if (order.length !== 0) {
      const filtered = order.filter((item) => item.status.includes(value));
      setData(filtered);
    }
  };

  const handleuser = async () => {
    if (order.length !== 0) {
      const customerId = order.map((item) => item?.customerId);
      console.log(customerId);
      fetchuser(customerId);
    }
  };

  const fetchuser = async (customerId) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/user/all/${customerId}`
      );
      if (res.data) {
        setUser(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlesearch = (e) => {
    const value = e.target.value;
    if (order.length !== 0) {
      const filter = order.filter((item) =>
        item.ordernumber.toString().includes(value)
      );
      setData(filter);
    }
  };

  const updatestatus = (e) => {
    const value = e.target.value;
    setOrderDetails((prev) => ({ ...prev, status: value }));
  };

  const updatecomment = (e) => {
    const value = e.target.value;
    setOrderDetails((prev) => ({ ...prev, comment: value }));
  };

  const handleupdatestatus = async () => {
    console.log(OrderDetails);
    const formdata = new FormData();
    formdata.append("_id", OrderDetails._id);
    formdata.append("status", OrderDetails.status);
    formdata.append("comment", OrderDetails.comment);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/order/updatestatus`,
        formdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data) {
        toast.success("update", {
          position: "top-left",
        });
        handleorder();
        setOrderDetails("");
      }
    } catch (error) {
      console.log(error);
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

  return (
    <div className="back-box my-3 container">
      <section className="search-box my-3">
        <section className="col-12 col-md-6">
          <label className="text-start">Status:</label>
          <select onChange={statuschange} name="size" className="mx-4">
            <option value=""></option>
            {status.map((each) => (
              <option key={each} value={each}>
                {each}
              </option>
            ))}
          </select>
        </section>
        <section className="col-12 col-md-6">
          <label htmlFor="search" className="mx-5">
            Search Order:{" "}
          </label>
          <input
            id="search"
            type="text"
            name="search"
            onChange={handlesearch}
          />
        </section>
      </section>
      <section className="table-responsive">
        <DataTable columns={column} data={data} pagination highlightOnHover />
      </section>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-md">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Status Update
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <section className="text-start">
                <label>Status :</label>
                <select onChange={updatestatus} name="size" className="mx-4">
                  <option value=""></option>
                  {status.map((each) => (
                    <option key={each} value={each}>
                      {each}
                    </option>
                  ))}
                </select>
              </section>
              <section className="mt-2 text-start">
                <label>Comment :</label>
              </section>
              <textarea onChange={updatecomment} />
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
                onClick={handleupdatestatus}
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

export default OrderDetails;
