import React, { useEffect, useState } from 'react'

const User = () => {
const [data,setData]=useState([])
  const getUserData= async ()=>{
    
const res=await fetch("http://localhost:8080/api/admin/getallusers",{
  method:'GET',
  headers:{
  "authorization":`Bearer ${localStorage.getItem("authToken")}`,
  'Content-Type':"application/json"
  },

})
const result=await res.json()
setData(result.data)
  }

  useEffect(()=>{
    getUserData()
  })
  return (
    <>
    <h1 style={{textAlign:'center'}}>USER MANAGEMENT </h1>
    <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Designation</th>
    </tr>
  </thead>
  <tbody>
    {data.map((item,index)=>
    <tr>
      <th scope="row">{index+1}</th>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{item.isSeller?"Seller":item.isAdmin?"Admin":"User"}</td>
    </tr>
    )}
 
  </tbody>
</table>
    
    </>
  )
}

export default User