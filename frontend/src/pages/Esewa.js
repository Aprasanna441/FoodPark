import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom';

const Esewa = () => {
  const [hash,setHash]=useState("")
const p="EPAYTEST"
  const location=useLocation()
  return (
    <>
    <h1>Proceed to Epay</h1>
    {/* v2 doesnt work did my time loss  */}
 {/* <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
  <label htmlFor="amount">Amount</label>
 <input type="text" id="amount" class="form-control" name="amount" value={location.state.total_amount} required/>
 <label htmlFor="amount">Tax Amount</label>
 <input type="text" id="tax_amount" class="form-control" name="tax_amount" value ="0" required/>
 <label htmlFor="amount">Total Amount</label>
 <input type="text" id="total_amount" class="form-control" name="total_amount" value={location.state.total_amount} required/>
 <label htmlFor="amount">Transaction UUID</label>
 <input type="text" id="transaction_uuid" class="form-control" value={location.state.id}  name="transaction_uuid"required/>
 <label htmlFor="amount">Product Code</label>
 <input type="text" id="product_code" class="form-control"  name="product_code" value ="EPAYTEST"  required/>
 <label htmlFor="amount">Product Service Charge</label>
 <input type="text" id="product_service_charge" class="form-control"  name="product_service_charge" value="0" required/>
 <label htmlFor="amount">Product Delivery Charge</label>
 <input type="text" id="product_delivery_charge" class="form-control"  name="product_delivery_charge" value="0" required/>

 <input type="text" id="success_url" class="form-control"  name="success_url" value="http://localhost:3000/success" required hidden/>

 <input type="text" id="failure_url"  class="form-control"  name="failure_url" value="http://localhost:3000/fail" required hidden/>
 
 <input type="text" id="signed_field_names" class="form-control"  name="signed_field_names"   hidden />

 <input type="text"  id="signature"  class="form-control"  name="signature"   required  value="cKZlaPgGI1GCtBONkLHZpHQojI2fA8vCr9ISAcjw3w0="/>
 <input  type="submit"/> 
 </form> */}


    <form action="https://uat.esewa.com.np/epay/main" method="POST">
    <input value={location.state.total_amount} name="tAmt" />
    <input value={location.state.total_amount} name="amt" />
    <input value="0" name="txAmt" hidden/>
    <input value="0" name="psc" hidden/>
    <input value="0" name="pdc" hidden/>
    <input value="EPAYTEST" name="scd" hidden/>
    <input value={location.state.id} name="pid" hidden/>
    <input value="http://localhost:3000/success" hidden name="su"/>
    <input value="http://localhost:3000/fail" hidden name="fu"/>
    <input value="Submit" type="submit"/>
    </form>


    </>
  )
}

export default Esewa