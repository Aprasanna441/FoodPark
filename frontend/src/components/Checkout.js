import React from 'react'

const Checkout = () => {
    const data=JSON.parse(localStorage.getItem("cartitem"))
    const submi=async ()=>{
        const res=await fetch("http://localhost:8080/api/orders/makeOrder",{
            method:"POST",
           body: JSON.stringify({
                payment_method:"Esewa"
                ,delivery_address:"Address"
                ,status:"Pending",
                order_data:data
            }),
            headers:{
                "Content-Type":"application/json",
                "authorization":`Bearer ${localStorage.getItem("authToken")}`

            }
        })
        const result=await res.json()
        console.log(result)

    }
  return (
    <div>
        <button className='btn btn-primary' onClick={submi}>Sumit</button>
    </div>
  )
}

export default Checkout