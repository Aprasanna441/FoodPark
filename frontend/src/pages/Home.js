import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import {useCart} from "../Features/ContextReducer"
import { useTheme } from "../Features/ThemeReducer";

import Card from "../components/Card";

const Home = () => {

const [query,setQuery]=useState('')

  const {state,dispatch}=useCart()
  const {theme,changeTheme}=useTheme()
  const lo=localStorage.getItem("cartitem")


  const [page,setPage]=useState(0)

 
     
  const [arr, setArr] = useState([]);
  const [category, setCategory] = useState([]);
  const [currentCategory,setCurrentCategory]=useState(null)
  

  const search=async ()=>{
    
    const res=await fetch(`http://localhost:8080/api/products/searchproducts?q=${query}`,{
     
     method:'GET',
     headers:{
      'Content-Type':'application/json'
     }
    })
    const result=await res.json()
    console.log(result.data)
    setArr(result.data)
  }
  

 
  const setProducts = async () => {
    const res = await fetch("http://localhost:8080/api/products/allproducts");
    const result = await res.json();
    // setArr(result.data)

    //code to  remove duplicates from CategoryName that came from Product CategoryName
    // let unique = [];
    // result.data.forEach((item) => {
    //   if (!unique.includes(item.CategoryName)) {
    //     unique.push(item.CategoryName);
    //   }
    // });
    // setCategory(unique);
    return setArr(result.data.slice(page,page+3));
   };

   const changePage=async ()=>{
    return setArr(arr.slice(page,page+3));
   }

  useEffect(() => {
    setProducts();
    
  },);

  return (
    <>
    
      <div className={theme === 'dark'? "bg-dark":"bg-light"} style={{ textAlign: "center" }}>
        
        <Carousel />

        <form className=" d-flex justify-content-center">
          <input
            className="form-control me-2 w-75 bg-white text-dark"
            type="search"
            placeholder="Type in..."
            aria-label="Searcch"
            name="searchquery"
            onChange={(e)=>setQuery(e.target.value)}
        
          />
          <button onClick={search} className="btn text-white bg-success"     type="submit">
            Search
          </button>
        </form>
        
        {/* <select
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
        </select> */}
       
       
        
        <div className="d-flex flex-wrap   justify-content-around mt-4  align-items-center  ">
          {arr==""?<h1>Empty</h1>:""}
          {arr.map((item) => 
            
            <Card
            
            item={item}
          
          /> 

          
         
             
          )}
         
       
          


            


        </div>

        
      </div>
      <div className="d-flex justify-content-center mt-5"><nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item">
      <button class="page-link" onClick={()=>page>0?setPage(page-3):page} aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
        <span class="sr-only">Previous</span>
      </button>
    </li>
     <li class="page-item"><a class="page-link" href="#">{page/3}</a></li>

    <li class="page-item">
      <button class="page-link"  onClick={()=>setPage(page+3)} aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
        <span class="sr-only">Next</span>
      </button>
    </li>
  </ul>
</nav></div>
    </>
  );
};
export default Home;
