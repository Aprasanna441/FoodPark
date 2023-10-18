import React, { useEffect, useState } from 'react'



const MyOrders = () => {
    const [dataa,setData]=useState([])
  

    const fetchData=async ()=>{
      
      const res=await fetch("http://localhost:8080/api/orders/vieworder",
      {
          method:"GET",
          headers:{
              'Content-Type':'application/json',
              'authorization':`Bearer ${localStorage.getItem("authToken")}`
          }
      })
    
      const result=await res.json()
      setData(result.data)
    }
    console.log(dataa)

    useEffect(()=>{
        fetchData()
    },[])
  return (
    <>
    <h1>My Orders</h1>
    <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Order id</th>
      <th scope="col">Payment Method</th>
      <th scope="col">Payment Status</th>
      <th scope="col">Delivery Address</th>
      <th scope="col">Order Time</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>
    {dataa.map((item,index)=>
    <tr>
      <th scope="row">{index+1}</th>
      <td>{item._id}</td>
      <td>{item.paymentMethod}</td>
      <td>{item.paymentMethod==="Esewa" && item.status==="Placed and Unpaid"?"Cancelled":item.status}</td>
      <td>{item.deliveryAddress}</td>
      <td>{item.orderTime}</td>
      <td>{item.totalPrice}</td>
    </tr>
    )}
  
  </tbody>
</table>
        </>
  )
}

export default MyOrders