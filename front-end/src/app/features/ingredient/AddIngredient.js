import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Add } from "./IngredientSlice";

const AddIngredient = () => {
  const [ingred, setIngred] = useState([]);
  const dispatch = useDispatch();
  const [error, setError] = useState();

  const AddIngred = () => {
    if (ingred.length !== 0) {
      dispatch(Add(ingred));
      setError("");
    } else {
      setError("please fill the ingredient");
    }
    setIngred("");
  };

  return (
    <div>
      <label className="mx-2" htmlFor="ingred">
        Ingredient
      </label>
      <input
        value={ingred}
        className="w-50"
        id="ingred"
        onChange={(e) => setIngred(e.target.value)}
        placeholder={error}
      />
      <button
        type="button"
        className="btn btn-primary mx-2 my-2 my-lg-0"
        onClick={AddIngred}
      >
        Add
      </button>
    </div>
  );
};

export default AddIngredient;
