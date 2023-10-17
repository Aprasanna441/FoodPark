import React from "react";
import { Button } from "@mui/material";
import { useState } from "react";
import { useCart } from "../Features/ContextReducer";

const Card = ({ item }) => {
  const { state, dispatch } = useCart();

  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0.5);
  const [foodOption, setFoodOption] = useState("");
  const data = JSON.parse(localStorage.getItem("cartitem"));
  

  const [added, toggleAdded] = useState(false);

  const handleAddToCart = async () => {
    if (price == 0) {
      console.log("empty");
    } else if  ( data && data.length >= 1) {
      data.forEach((elem) => {
        if (elem.name === item.name && elem.option === foodOption) {
          toggleAdded(!added);
        } else {
          console.log("new");
          dispatch({
            type: "ADD",
            payload: {
              name: item.name,
              option: foodOption,
              rate: price,
              quantity: quantity,
              price: price * quantity,
            },
          });
        }
      });
    } else {
      dispatch({
        type: "ADD",
        payload: {
          name: item.name,
          option: foodOption,
          rate: price,
          quantity: quantity,
          price: price * quantity,
        },
      });
    }
  };

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
        <img className="card-img-top" src={item.img} alt="" />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <button
            className="btn btn-danger"
            onClick={() => {
              quantity === 0.5 ? setQuantity(0.5) : setQuantity(quantity - 0.5);
            }}
          >
            -
          </button>
          <input
            type="number"
            name="quantity"
            value={quantity}
            style={{ textAlign: "center" }}
            className="w-50 rounded"
          />
          <button
            className="btn btn-primary "
            onClick={() => {
              setQuantity(quantity + 0.5);
            }}
          >
            +
          </button>
          {/* SELECT MENU */}
          <select
            className="form-select bg-info w-80"
            style={{ textAlign: "center" }}
            aria-label="Default select example"
            onChange={(e) => {
              toggleAdded(false)
              
              setPrice(e.target.value.split(",")[0]);
              setFoodOption(e.target.value.split(",")[1]);
            }}
          >
            <option>Select Food</option>

            {item.options.map((e, i) => (
              <option value={[e.price, e.type]}>{e.type}</option>
            ))}
          </select>

          <p>
            <span style={{ fontWeight: "bolder" }}>Total:</span>Rs.
            {price * quantity}
          </p>

{added?
          <p style={{color:'red',fontWeight:'bolder'}}>ALREADY IN CART</p>:""}
            <button className="btn btn-danger" onClick={handleAddToCart}>
              ADD TO CART
            </button>
         


        </div>
      </div>
    </div>
  );
};

export default Card;
