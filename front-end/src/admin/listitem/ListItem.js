import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { BsPencil, BsTrash } from "react-icons/bs";
import "./ListItem.css";
import { useSelector } from "react-redux";
import { selectuser } from "../../app/features/user/userSlice";
import { toast } from "react-toastify";

const ListItem = () => {
  const [search, setSearch] = useState("");
  const [menu, setMenu] = useState([]);
  const [base, setBase] = useState([]);
  const [ingredient, setIngredient] = useState("");
  const [searchmenu, setSearchmenu] = useState("");
  const [data, setData] = useState("");
  const [filterdata, setFilteredData] = useState(data);
  const [updatedata, setUpdatedata] = useState();
  const user = useSelector(selectuser);

  useEffect(() => {
    if (user === null) {
      toast.info("Login properly", {
        position: "top-center",
      });
    }
    handleall();
    handlemenu();
    handlebase();
  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // Set the height of the rows
      },
    },
    headCells: {
      style: {
        fontSize: "16px", // Set font size for headers
        fontWeight: "bold", // Make headers bold
        backgroundColor: "#f4f4f4", // Light grey background for headers
        color: "#333", // Header text color
      },
    },
  };

  const columns = [
    {
      name: "",
      cell: (row) => <img className="w-75" src={row.imageUrl} alt={row.name} />,
    },
    {
      name: "name",
      selector: (row) => row.name,
      wrap: true,
    },
    {
      name: "price",
      cell: (row) => <span>₹{row.price}</span>,
    },
    {
      name: "size",
      selector: (row) => row.size,
    },
    {
      name: "category",
      cell: (row) => <span className={row.category}>{row.category}</span>,
    },
    {
      name: "ingredient",
      cell: (row) =>
        Array.isArray(row.ingredients)
          ? row.ingredients.join(", ")
          : "No ingredients",
      wrap: true,
    },
    {
      name: "Menu",
      selector: (row) => row.menu,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      wrap: true,
    },
    {
      name: "Updates",
      cell: (row) => (
        <section>
          <button
            className="btn"
            onClick={() => setUpdatedata(row)}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            disabled={user === null ? true : false}
          >
            <BsPencil />
          </button>
          <button
            className="btn"
            type="button"
            onClick={() => handledelete(row._id)}
            disabled={user === null ? true : false}
          >
            <BsTrash />
          </button>
        </section>
      ),
    },
  ];

  const handledelete = async (id) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/pizza/delete/${id}`
      );
      if (res.data) {
        alert("success");
        handleall();
      }
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  const handleall = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API}/pizza/all`);
    if (res.data) {
      setData(res.data);
    }
  };

  const handlemenu = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API}/pizza/menu`);
    if (res.data) {
      setMenu(res.data);
    }
  };

  const handlebase = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API}/pizza/base`);
    if (res.data) {
      setBase(res.data);
    }
  };

  const menuchange = (e) => {
    const value = e.target.value;
    setSearchmenu(value);
    const filtered = data.filter((item) => item.menu.includes(value));
    setFilteredData(filtered);
  };

  const basechange = (e) => {
    const value = e.target.value;
    const filtered = data.filter((item) => item.base === value);
    setFilteredData(filtered);
  };

  const handlesearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handlefile = (e) => {
    const file = e.target.files[0];
    setUpdatedata((prev) => ({ ...prev, imageUrl: file }));
  };

  const handleupdate = async () => {
    const formdata = new FormData();
    formdata.append("_id", updatedata._id);
    formdata.append("name", updatedata.name);
    formdata.append("price", updatedata.price);
    formdata.append("size", updatedata.size);
    formdata.append("category", updatedata.category);
    formdata.append("ingredients", updatedata.ingredients);
    formdata.append("menu", updatedata.menu);
    formdata.append("description", updatedata.description);
    formdata.append("imageUrl", updatedata.imageUrl);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/pizza/update`,
        formdata
      );
      if (res.data) {
        alert("success");
        handleall();
      } else {
        alert("not updates");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const updateingredient = () => {
    updatedata.ingredients.push(ingredient);
    setIngredient("");
  };

  return (
    <div className="back-box my-3">
      <section className="row mt-4">
        <section className="col-12 col-lg-4 ">
          <label className="mx-2 fw-bold my-2 my-md-0  ">Menu</label>
          <select onChange={menuchange} name="size">
            <option value=""></option>
            {menu.map((each) => (
              <option key={each} value={each}>
                {each}
              </option>
            ))}
          </select>
        </section>
        <section className="col-12 col-lg-4 ">
          <label className="mx-2 fw-bold my-2 my-md-0 ">Base</label>
          <select onChange={basechange} name="size">
            <option value=""></option>
            {base.map((each) => (
              <option key={each} value={each}>
                {each}
              </option>
            ))}
          </select>
        </section>
        <section className="col-12 col-lg-4">
          <label className="mx-2 fw-bold ">Search</label>
          <input onChange={handlesearch} />
        </section>
      </section>

      <section className="mt-5 table-container">
        <DataTable
          columns={columns}
          pagination
          highlightOnHover
          data={filterdata}
          customStyles={customStyles}
        />
      </section>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Updates
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="row mt-3 g-5 g-lg-0 update-box">
                <section className="col-12 col-lg-4 input-field">
                  <label htmlFor="pizza-name" className="mx-2">
                    Name
                  </label>
                  <input
                    value={updatedata?.name}
                    id="pizza-name"
                    type="text"
                    name="name"
                    onChange={(e) => {
                      setUpdatedata((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }));
                    }}
                  />
                </section>
                <section className="col-12 col-lg-4 input-field">
                  <label htmlFor="pizza-price" className="mx-2">
                    Price
                  </label>
                  <input
                    value={updatedata?.price}
                    id="pizza-price"
                    type="text"
                    name="price"
                    onChange={(e) => {
                      setUpdatedata((prev) => ({
                        ...prev,
                        price: Number(e.target.value),
                      }));
                    }}
                  />
                </section>
                <section className="col-12 col-lg-4 input-field my-5 my-lg-0">
                  <label htmlFor="ingredient">Ingredients</label>
                  <input
                    id="ingredient"
                    name="ingredient"
                    type="text"
                    value={ingredient}
                    onChange={(e) => setIngredient(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={updateingredient}
                  >
                    Add
                  </button>
                </section>
                <section className="col-12 col-lg-4 input-field my-5">
                  <ul className="ingred-list  col-12 col-lg-6 ">
                    {updatedata?.ingredients ? (
                      <>
                        <p>Ingredient:</p>
                        {updatedata?.ingredients.map((item) => (
                          <li>{item}</li>
                        ))}
                      </>
                    ) : (
                      ""
                    )}
                  </ul>
                </section>
                <section className=" col-12 col-lg-4 input-field">
                  <label className="mx-lg-5">Description</label>
                  <textarea
                    className="w-75"
                    value={updatedata?.description}
                    onChange={(e) =>
                      setUpdatedata((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    name="description"
                  ></textarea>
                </section>
                <section className="col-12 col-lg-4 input-field my-5 my-lg-0">
                  <input
                    type="file"
                    name="imageUrl"
                    accept="image/*"
                    className="text-primary my-5"
                    onChange={(e) => handlefile(e)}
                  />
                </section>
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
                onClick={handleupdate}
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
