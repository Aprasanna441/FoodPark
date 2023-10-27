import React, { useEffect, useState } from 'react'

const Order = () => {
  const [data,setData]=useState([])
  const [modal,setModal]=useState(false)
  const [modalData,setModalData]=useState([])
const [deliverCount,setOrder1Count]=useState()
const [paidPlacedCount,setOrder2Count]=useState()
const [unpaidPlacedCount,setOrder3Count]=useState()

  const getOrders= async ()=>{
    
    const res=await fetch("http://localhost:8080/api/admin/getallorders",{
      method:'GET',
      headers:{
      "authorization":`Bearer ${localStorage.getItem("authToken")}`,
      'Content-Type':"application/json"
      },
    
    })
    const result=await res.json()
    setData(result.data)

 
    let deliveredCount=0;
    let paidCount=0;
  let unpaidCount=0;
 
  data.forEach((e)=>{
    e.status==="Delivered and Paid"?deliveredCount++:
    e.status==="Placed and Paid"?paidCount++:unpaidCount++
   
    
  })
  setOrder1Count(deliveredCount)
  setOrder2Count(paidCount)
  setOrder3Count(unpaidCount)
      }


    


      useEffect(()=>{
        getOrders();
        
        
       
      })
  return (
    <div>
      <h1>ALL ORDERS</h1>
      <ul>
        <li>Delivered: {deliverCount}</li>
        <li>Placed:{paidPlacedCount}</li>
        <li>Unpaid:{unpaidPlacedCount}</li>
      </ul>
      <button className='btn btn-primary' onClick={()=>setModal(!modal)}>CLOSE</button>
      {!modal?
      <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">ID</th>
      <th scope="col">email</th>
      <th scope="col">Payment Method</th>
      <th scope="col">Status</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {data.map((item,index)=>
    <tr>
      <th scope="row">{index+1}</th>
      <td>{item._id.slice(6,9)}</td>
      <td>{item.email}</td>
      <td>{item.paymentMethod}</td>
      <td>{item.status}</td>
      <td><button className='btn-sm btn-primary btn' onClick={()=>{
        setModalData(item)
        setModal(!modal)
      }}>EDIT</button></td>
    </tr>
)}

  </tbody>
</table>
:<OrderModal props={modalData}/>}
    </div>
  )
}

const OrderModal=({props})=>{

const [status,setStatus]=useState('')
  const updateOrder=async ()=>{
    const res=await fetch('http://localhost:8080/api/admin/updateorder',{
      method:"PATCH",
      headers:{
        'authorization':`Bearer ${localStorage.getItem("authToken")}`,
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
      id:props._id,
      status:status
      })
  
  })
const result=await res.json()
}

  return (
    <>
   <select class="form-select" onChange={(e)=>setStatus(e.target.value)} aria-label="Default select example">
  <option selected value={props.status}>{props.status}</option>
  <option value="Delivered and Paid">Delivered and Paid</option>
  <option value="Placed and Paid">Placed and Paid</option>
  <option value="Placed and Unpaid">Placed and Unpaid</option>
</select>
<button className='btn btn-primary' onClick={updateOrder}>Submit</button>
    </>
  )
}

export default Order