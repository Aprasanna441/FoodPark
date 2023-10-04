import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink, useNavigate } from 'react-router-dom'


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark  p-3 w-100" style={{backgroundColor:'#0496C7'}}>
    <NavLink className="navbar-brand" to="/"><span style={{color:'aqua'}}> Food</span>Park</NavLink>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
   
  
    <div className="collapse navbar-collapse w-100" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <NavLink className="nav-link"  to="/products">Home </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link"  to="/login">Login</NavLink>
        </li>
      </ul>
 
    </div>
  </nav> 
  )
}

export default Navbar