import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import {useCart} from "../Features/ContextReducer"
import { useTheme } from "../Features/ThemeReducer";

import Card from "../components/Card";

const Home = () => {
  const {state,dispatch}=useCart()
  const {theme,changeTheme}=useTheme()
  const lo=localStorage.getItem("cartitem")
 
     
  const [arr, setArr] = useState([]);
  const [category, setCategory] = useState([]);
  const [currentCategory,setCurrentCategory]=useState(null)
  



 
  const setProducts = async () => {
    const res = await fetch("http://localhost:8080/api/products/allproducts");
    const result = await res.json();

    //code to  remove duplicates from CategoryName that came from Product CategoryName
    let unique = [];
    result.data.forEach((item) => {
      if (!unique.includes(item.CategoryName)) {
        unique.push(item.CategoryName);
      }
    });
    setCategory(unique);
    return setArr(result.data);
  };

  useEffect(() => {
    setProducts();
    
  },[arr]);

  return (
    <>
    
      <div className={theme === 'light'? "bg-dark":"bg-light"} style={{ textAlign: "center" }}>
        
        <Carousel />

        <form className=" d-flex justify-content-center">
          <input
            className="form-control me-2 w-75 bg-white text-dark"
            type="search"
            placeholder="Type in..."
            aria-label="Search"
          />
          <button className="btn text-white bg-success" type="submit">
            Search
          </button>
        </form>
        
        <select
          name=""
          id=""
          className="form-select bg-info w-50"
          style={{ margin: 10 }}
          onChange={(e)=>{setCurrentCategory(e.target.value)
             console.log(currentCategory)}}
          
        >
          {category.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
       
        {state.map((it)=>(
         
          
        
        <p style={{color:"white"}}>Hello{it.price}</p>
        
        )
        )}
        
        <div className="d-flex flex-wrap   justify-content-around mt-4  align-items-center  ">
          {arr.map((item) => 
            (currentCategory === null || item.CategoryName === currentCategory)?
            <Card
            
            item={item}
          
          /> : 
          <h1>Empty</h1>

          
         
             
          )}
         
       
          


            


        </div>

        
      </div>
    </>
  );
};
export default Home;
