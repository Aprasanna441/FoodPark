import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import MyOrders from './MyOrders'

const Dashboard = () => {
   const [data,setData]=useState([])
    const userInfo=async ()=>{
        const res=await fetch("http://localhost:8080/api/account/getUserInfo",
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
    useEffect(()=>{
      userInfo()
    },[])
  return (
    <div className="card" style={{width: '18rem'}}>
  
  <div className="card-body">
    <h5 className="card-title">Name:{data.name}</h5>
    <h5 className="card-title">Email:{data.email}</h5>
    <h5 className="card-title">Member Since:{data.joined_on}</h5>
    <h5 className="card-title">Location:{data.location}</h5>
   
    <NavLink to="/" className="btn btn-primary">Change Password</NavLink>
    <NavLink to="/myorders" className="btn btn-primary">See Orders</NavLink>
    
  </div>
  

</div>
  )
}

export default Dashboard