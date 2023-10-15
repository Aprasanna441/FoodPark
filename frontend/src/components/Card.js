import React from "react";
import { Button } from "@mui/material";
import { useState } from "react";

const Card = ( {item}) => {
  const [price,setPrice]=useState(0)
  const [quantity,setQuantity]=useState(0.5)

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
            onClick={() =>{
              quantity === 0.5?setQuantity(0.5): setQuantity(quantity-0.5)
             
           }}
          >
            -
          </button>
          <input
            type="number"
            name="quantity"
            value={quantity}
            style={{textAlign:'center'}}
            
            className="w-50 rounded"
          />
          <button
            className="btn btn-primary "
            onClick={() =>{
             
               setQuantity(quantity+0.5)
               
            }}
          >
            +
          </button>
          {/* SELECT MENU */}
          <select
            className="form-select bg-info w-80"
            style={{ textAlign: "center" }}
            aria-label="Default select example"
            onChange={(e)=>setPrice(e.target.value)}
          >
            <option value="Select Food Category">Select Food</option>
            
            
           {item.options.map((e,i)=><option value={e.price}  >{e.type}</option>)}
           
            
            
          </select>

          <p><span style={{fontWeight:'bolder'}}>Total:</span>Rs.{price * quantity}</p>
<button className="btn btn-danger" onClick={()=>console.log("added to cart",item.name)}>ADD TO CART</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
