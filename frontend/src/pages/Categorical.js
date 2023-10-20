import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import {useCart} from "../Features/ContextReducer"
import { useTheme } from "../Features/ThemeReducer";

import Card from "../components/Card";

const Categorical = () => {
  const {state,dispatch}=useCart()
  const {theme,changeTheme}=useTheme()
  const lo=localStorage.getItem("cartitem")


  const [page,setPage]=useState(0)

 
     
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
    return setArr(result.data.slice(page,page+6));
  };

  useEffect(() => {
    setProducts();
    
  },[arr]);

  return (
    <>
    
      <div className={theme === 'dark'? "bg-dark":"bg-light"} style={{ textAlign: "center" }}>
        
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
       
       
        
        <div className="d-flex flex-wrap   justify-content-around mt-4  align-items-center  ">
          {arr.map((item) => 
            (currentCategory === null || item.CategoryName === currentCategory)?
            <Card
            
            item={item}
          
          /> : 
          null

          
         
             
          )}
         
       
          


            


        </div>

        
      </div>
      <div className="d-flex justify-content-center mt-5"><nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item">
      <a class="page-link" href="#" onClick={()=>page>0?setPage(page-6):page} aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
        <span class="sr-only">Previous</span>
      </a>
    </li>
     <li class="page-item"><a class="page-link" href="#">{page/6}</a></li>

    <li class="page-item">
      <a class="page-link" href="#" onClick={()=>setPage(page+6)} aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
        <span class="sr-only">Next</span>
      </a>
    </li>
  </ul>
</nav></div>
    </>
  );
};
export default Categorical;
