import React, { useEffect, useState } from "react";
import "./AddItem.css";
import axios from "axios";
import AddList from "./AddList";
import AddIngredient from "../../app/features/ingredient/AddIngredient";
import ListIngredient from "../../app/features/ingredient/ListIngredient";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteItem } from "../../app/features/ingredient/IngredientSlice";
import { selectallingredient } from "../../app/features/ingredient/IngredientSlice";
import { toast } from "react-toastify";
import { selectuser } from "../../app/features/user/userSlice";

const AddIitem = () => {
  const ingredient = useSelector(selectallingredient);
  const user = useSelector(selectuser);
  const [category, setCategory] = useState([]);
  const [size, setSize] = useState([]);
  const [menu, setMenu] = useState([]);
  const [base, setBase] = useState([]);
  const [pizza, setPizza] = useState([]);
  const [imgsrc, setImgsrc] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    handleCategory();
    handleSize();
    handlemenu();
    handlebase();
  }, []);

  const handleCategory = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API}/pizza/category`);
    if (res.data) {
      setCategory(res.data);
    }
  };

  const handleSize = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API}/pizza/size`);
    if (res.data) {
      setSize(res.data);
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

  const categorychange = (event) => {
    setPizza((prev) => ({ ...prev, category: event.target.value }));
  };

  const sizechange = (event) => {
    setPizza((prev) => ({ ...prev, size: event.target.value }));
  };

  const menuchange = (event) => {
    setPizza((prev) => ({ ...prev, menu: event.target.value }));
  };

  const basechange = (event) => {
    setPizza((prev) => ({ ...prev, base: event.target.value }));
  };

  const handlefile = (e) => {
    const file = e.target.files[0];
    setPizza((prev) => ({ ...prev, imageUrl: file }));
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImgsrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const description = (e) => {
    setPizza((prev) => ({
      ...prev,
      description: e.target.value,
      ingredient: ingredient,
    }));
  };

  const addpizza = async (e) => {
    e.preventDefault();
    const pizzadata = new FormData();
    pizzadata.append("name", pizza.name);
    pizzadata.append("price", pizza.price);
    pizzadata.append("size", pizza?.size || "Regular");
    pizzadata.append("category", pizza.category);
    pizzadata.append("ingredient", JSON.stringify(pizza.ingredient));
    pizzadata.append("description", pizza.description);
    pizzadata.append("imageUrl", pizza.imageUrl);
    pizzadata.append("menu", pizza.menu);
    pizzadata.append("base", pizza.base || "Classic Hand Toassed");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/pizza/add`,
        pizzadata
      );
      if (response.data) {
        toast.success("Added");
        setPizza({
          name: "",
          price: "",
          description: "",
          imageUrl: "",
        });
        dispatch(deleteItem());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className="back-box my-3" onSubmit={(e) => addpizza(e)}>
        <h3 className="text-center pt-2">Add Pizza</h3>
        <div className="row mt-3 g-5 g-lg-0">
          <section className="col-12 col-lg-4 input-field">
            <label htmlFor="pizza-name" className="mx-2">
              Name
            </label>
            <input
              value={pizza?.name}
              id="pizza-name"
              type="text"
              name="name"
              onChange={(e) => {
                setPizza((prev) => ({ ...prev, name: e.target.value }));
              }}
            />
          </section>
          <section className="col-12 col-lg-4 input-field">
            <label htmlFor="pizza-price" className="mx-2">
              Price
            </label>
            <input
              value={pizza?.price}
              id="pizza-price"
              type="text"
              name="price"
              onChange={(e) => {
                setPizza((prev) => ({
                  ...prev,
                  price: Number(e.target.value),
                }));
              }}
            />
          </section>
          <section className="col-12 col-lg-4 input-field">
            <label className=" mx-md-2">Size </label>
            <select onChange={sizechange} name="size" className="mx-4">
              <option value="">Select Size</option>
              {size.map((each) => (
                <option key={each} value={each}>
                  {each}
                </option>
              ))}
            </select>
          </section>
        </div>
        <div className="row my-5 g-5 g-lg-0">
          <section className="col-12 col-lg-4 input-field">
            <label>Category</label>
            <select onChange={categorychange} name="category">
              <option value="">Select category</option>
              {category.map((each) => (
                <option key={each} value={each}>
                  {each}
                </option>
              ))}
            </select>
          </section>
          <section className="col-12 col-lg-4 input-field">
            <AddIngredient />
          </section>
          <section className="col-12 col-lg-4 input-field">
            <section className="col-12 col-lg-4 input-field">
              <label className="my-3 mx-2">base</label>
              <select onChange={basechange} name="size">
                <option value="">Select base</option>
                {base.map((each) => (
                  <option key={each} value={each}>
                    {each}
                  </option>
                ))}
              </select>
            </section>
          </section>
        </div>
        <div className="row">
          <ListIngredient setPizza={setPizza} />
        </div>
        <div className="row">
          <section className="col-12 col-lg-4 input-field">
            <label className="my-3">Menu</label>
            <select onChange={menuchange} name="size">
              <option value="">Select Item</option>
              {menu.map((each) => (
                <option key={each} value={each}>
                  {each}
                </option>
              ))}
            </select>
          </section>
          <section className=" col-12 col-lg-4 input-field">
            <label className="mx-lg-5">Description</label>
            <textarea
              className="w-75"
              value={pizza?.description}
              onChange={(e) => description(e)}
              name="description"
              id="pizza-description"
            ></textarea>
          </section>
          <section className="col-12 col-lg-4 input-field my-5 my-lg-0">
            <input
              type="file"
              name="imageUrl"
              accept="image/*"
              className="text-primary"
              onChange={(e) => handlefile(e)}
              id="pizza-img"
            />
          </section>
        </div>
        <section className="added-list">
          <AddList image={imgsrc} pizza={pizza} />
        </section>
        <section>
          <button
            type="submit"
            className="btn btn-primary m-2"
            disabled={user === null ? true : false}
          >
            Add
          </button>
        </section>
      </form>
    </div>
  );
};

export default AddIitem;
