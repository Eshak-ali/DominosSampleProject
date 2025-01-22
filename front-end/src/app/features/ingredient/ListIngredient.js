import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, selectallingredient } from "./IngredientSlice";
import "./ingredient.css";
import { BsX } from "react-icons/bs";

const ListIngredient = ({ setPizza }) => {
  const ingredient = useSelector(selectallingredient);
  const dispatch = useDispatch();

  useEffect(() => {
    addpizza()
  }, [ingredient]);

  const addpizza = () => {
    setPizza((prev) => ({ ...prev, ingredient: ingredient }));
  };

  const handledelete = (item) => {
    dispatch(deleteItem(item));
  };

  const renderIngredient = ingredient.map((item) => (
    <li key={item} onClick={() => handledelete(item)}>
      {item}
      <span>
        <BsX />
      </span>
    </li>
  ));
  
  return (
    <div>
      <p className="text-start m-0">Ingredient:</p>
      <ul className="ingred-list">{renderIngredient}</ul>
    </div>
  );
};

export default ListIngredient;
