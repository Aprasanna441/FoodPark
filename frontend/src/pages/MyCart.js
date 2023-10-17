import React, { useEffect, useState } from 'react'
import {useCart} from "../Features/ContextReducer"
import { useTheme } from '../Features/ThemeReducer'

const MyCart = () => {
    
   const {theme,changeTheme}=useTheme()
    const lo=localStorage.getItem("cartitem")
    const data=JSON.parse(lo)
  

   const totalPrice=()=>{
    let sum = 0;
    data.forEach(element => {
      sum += element.price;
    });
    
    return sum
   }

  return (
    <div className={theme==='dark'?" bg-dark":""}>
      <h1>MY CART</h1>
        <table  className={theme==='dark'?"table table-dark":"table"}>
  <thead className="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th> 
      <th scope="col">Quantity</th>
      <th scope="col">Rate</th>
      <th scope='col'>Price</th>
    </tr>
  </thead>
  <tbody>
    {data.map((i,index)=>
    <tr>
      
      <th scope="row">{index+1}</th>
      <td>{i.name}</td>
      <td>{i.quantity}</td>
      <td>{i.rate}</td>
      <td>{i.price}</td>
      
    </tr>


    )}
 
  </tbody>
</table>
   <p style={{float:'right',marginRight:40,fontWeight:'bolder'}}> <span style={{color:'green'}}>GRAND TOTAL:</span> Rs.{totalPrice()} </p>


        
    </div>
  )
}

export default MyCart