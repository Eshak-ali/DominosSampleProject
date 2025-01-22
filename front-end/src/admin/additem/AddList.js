import React from "react";
import "./AddList.css";

const AddList = ({ image, pizza }) => {
  return (
    <div className=" ">
      <section className="row Addlist-box mx-5 my-4">
        <section className="col-12 col-lg-4 my-5 my-lg-0">
          {image ? <img src={image} alt="Pizza" className="addlist-img" /> : ""}
        </section>
        <section className="col-12 col-lg-8">
          <article className="addlist-pizza">
            <h4 className="col-12 col-lg-4  text-start">{pizza?.name}</h4>
            <p className="col-12 col-lg-4 text-start">
              {pizza.size ? `Size:${pizza?.size}` : ""}<br/>
              <span>{pizza.base ? `base:${pizza?.base}` : ""}</span>
            </p>
          </article>
          <article className="addlist-pizza">
            <p className="col-12 col-lg-4 text-start">
              {pizza.category ? (
                <span className={pizza?.category}>
                  Category:{pizza?.category}
                </span>
              ) : (
                ""
              )}
            </p>
            <ul className="ingred-list w-md-50 col-12 col-lg-4">
              {pizza.ingredient ? (
                <>
                  <p>Ingredient:</p>
                  {pizza.ingredient.map((item) => (
                    <li>{item}</li>
                  ))}
                </>
              ) : (
                ""
              )}
            </ul>
          </article>
          <article className="text-start">
            <h5 className="col-12 col-lg-4">
              {pizza.price ? `₹${pizza.price}` : ""}
            </h5>
            <p className="description col-12 col-lg-12 fs-5">
              {pizza.description ? `Description:${pizza?.description}` : ""}
            </p>
          </article>
        </section>
      </section>
    </div>
  );
};

export default AddList;
