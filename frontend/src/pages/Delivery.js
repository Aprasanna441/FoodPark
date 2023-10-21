import React, { useEffect, useState } from 'react'

const Delivery = () => {
  const [data,setData]=useState([])

 const update= async (id)=>{
  const res=await fetch('http://localhost:8080/api/delivery/deliverFood',{
    method:'POST',
    body:JSON.stringify({orderId:id}),
    headers:{
      'Content-Type':'application/json',
      'authorization':`Bearer ${localStorage.getItem("authToken")}`
    }
  })
  const result= await res.json()
  setData(result.data)

 }


  const getData=async ()=>{
  const res=await fetch('http://localhost:8080/api/delivery/allOrders',{
    method:'GET',
    headers:{
      'Content-Type':'application/json',
      'authorization':`Bearer ${localStorage.getItem("authToken")}`
    }
  })
  const result= await res.json()
  setData(result.data)
  }

  useEffect(()=>{
    getData()
  })
  return (
    <>
    <h1>All Orders</h1>
    <table class="table ">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
      <th scope="col">Address</th>
      <th scope="col">Status</th>
      <th scope="col">Total Price</th>
      <th scope="col">Update</th>
    </tr>
  </thead>
  <tbody>
    {data.map((item,index)=>
    <tr>
      <th scope="row">{index+1}</th>
      <td>{item.email}</td>
      <td>{item.phoneNumber}</td>
      <td>{item.deliveryAddress}</td>
      <td>{item.status}</td>
      <td>{item.totalPrice}</td>
      <td><button class='btn btn-primary btn-sm' onClick={()=>update(item._id)}>Clear</button></td>
    </tr>
    )}
  
  </tbody>
</table>
</>
  )
}

export default Delivery