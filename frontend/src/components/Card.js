import React from "react";
import { useState } from "react";

const Card = ({ item, decreaseQuantity, increaseQuantity }) => {
  return (
    <div
      className="d-flex flex-wrap   justify-content-around mt-4  align-items-center  "
      style={{ textAlign: "center" }}
    >
      <div
        key={item._id}
        className="card bg-light mt-4 "
        style={{ width: "18rem", textAlign: "center" }}
      >
        <img className="card-img-top" src={item.img} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <button
            className="btn btn-danger"
            onClick={() => decreaseQuantity(item._id)}
          >
            -
          </button>
          <input
            type="number"
            name="quantity"
            value={item.quantity}
            className="w-50 rounded"
          />
          <button
            className="btn btn-primary "
            onClick={() => increaseQuantity(item._id)}
          >
            +
          </button>
          {/* SELECT MENU */}
          <select
            className="form-select bg-info w-80"
            style={{ textAlign: "center" }}
            aria-label="Default select example"
          >
            
            
           {item.options.map((e,i)=><option value={e.type} selected>{e.type}</option>)}
           
            
            
          </select>

          {/* <p>Total:{item.price*item.quantity}</p> */}
        </div>
      </div>
    </div>
  );
};

export default Card;
