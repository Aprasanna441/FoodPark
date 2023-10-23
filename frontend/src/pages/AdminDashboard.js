import React, { useState } from 'react'
import User from './adminSection/User'
import Product from './adminSection/Product'
import Order from './adminSection/Order'
import Delivery from './adminSection/Delivery'
import Login from './Login'

const AdminDashboard = () => {
  const [section,setSection]=useState("User")
  
  return (
    <>
<div className='d-flex flex-row '>
<button class="p-2  btn btn-primary m-2" onClick={()=>setSection("User")}>USER</button>
  <button class="p-2 btn btn-primary m-2" onClick={()=>setSection("Product")}>PRODUCT</button>

   <button class="p-2 btn btn-primary m-2" onClick={()=>setSection("Order")}>ORDERS</button>
   {/* <button class="p-2 btn btn-primary m-2" onClick={()=>setSection("Delivery")}>DELIVERIES</button> */}

    </div>
    <div>
      <hr />
     
    {section==="User"?<User/>:
    section==="Product"?<Product/>:
    section==="Order"?<Order/>:
    section==="Delivery"?<Delivery/>:""
    }
    </div>





    </>
  )
}

export default AdminDashboard