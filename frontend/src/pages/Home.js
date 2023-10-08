import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import { NavLink } from "react-router-dom";
import Card from "../components/Card";

const Home = () => {

  const [arr, setArr] = useState([]);

  const increaseQuantity = (id) => {
    const updatedMenu = arr.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 0.5,total:item.total+item.price } : item
    );
    setArr(updatedMenu);
  };
  const decreaseQuantity = (id) => {
    const updatedMenu = arr.map((item) =>
      item.id === id && item.quantity >= 1
        ? { ...item, quantity: item.quantity - 0.5,total:item.total-item.price }
        : item
    );
    setArr(updatedMenu);
  };

  useEffect(  ()=>{
     fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(console.log);
  })

  return (
    <div className=" bg-dark">
      <Navbar />
         <Carousel />
         <form className=" d-flex justify-content-center"> 
          
                           <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Type in..." aria-label="Search" /> 
                            <button className="btn text-white bg-success" type="submit">Search</button> 
            </form>
      <div className="d-flex flex-wrap   justify-content-around mt-4  align-items-center  ">
        {arr.map((item) => (
        <Card item={item} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity}/>
        ))}
      </div>

      <Footer />
    </div>
  );
};
export default Home;
