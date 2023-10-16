import React from 'react'
import {useCart} from "../Features/ContextReducer"

const MyCart = () => {
    const {state,dispatch}=useCart()
  return (
    <div>
      <h1>MY CART</h1>
        <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th> 
      <th scope="col">Quantity</th>
      <th scope="col">Rate</th>
      <th scope='col'>Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
 
  </tbody>
</table>


        
    </div>
  )
}

export default MyCart