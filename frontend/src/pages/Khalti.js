import React from 'react'
import {useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Khalti = () => {
    const location=useLocation()

const proceedToPay= async ()=>{
    console.log(typeof(location.state.total_amount))
const res=await fetch("https://a.khalti.com/api/v2/epayment/initiate/",
{
method:"POST",
headers:{
    'Authorization': 'key 2fe9e6bb7dfd4954b9095ea3205e0881',
    'Content-Type': 'application/json',
},
body: JSON.stringify({
    "return_url": "http://localhost:3000/khaltiverify",
    "website_url": "http://localhost:3000/",
    "amount":(location.state.total_amount) *100,
    "purchase_order_id": location.state.id,
    "purchase_order_name": "test",
   
    })

})
const result= await res.json();
if(result.error_key){
console.log(result.error_key)
}
else{
    window.location.href = result.payment_url
}
}

  return (
    <>
    <h1>Proceed to Pay Via Khalti</h1>
     Total amount:{location.state.total_amount}
     <button onClick={proceedToPay} className='btn btn-secondary'>Pay</button>
    </>
  )
}

export default Khalti