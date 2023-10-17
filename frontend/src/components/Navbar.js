import React from "react";
import { useState } from "react";
import { useCart } from "../Features/ContextReducer";
import { useTheme } from "../Features/ThemeReducer";
import { NavLink, useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../services/localStorage";
import { Link } from "react-router-dom";

const Navbar = () => {
  const token = getToken();
  const { state, dispatch } = useCart();
  const { theme, changeTheme } = useTheme();
  const navigate=useNavigate()
  
  const num=()=>{
    if (localStorage.getItem("cartitem")){
   let  len=JSON.parse(localStorage.getItem("cartitem")).length
    return len
    }
    else{
      return 0
    }
  }
  

  const toggleTheme = async () => {
    await changeTheme({ type: "TOGGLE_THEME" });
  };

  return (
    <nav
    
      className="navbar  navbar-expand-lg   bg-warning  text-dark  p-3 w-100"
      style={{ backgroundColor: "#0496C7" }}
    >
      <NavLink className="navbar-brand font-weight-bold" to="/">
        <span style={{ color: "Red", fontWeight: "bolder" }}> Food</span>Park
      </NavLink>
      <NavLink
        className="nav-link text-dark font-weight-bold "
        style={{ fontWeight: "bolder" }}
        to="/products"
      >
        HOME{" "}
      </NavLink>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse w-100 d-flex-lg justify-content-end "
        id="navbarSupportedContent"
      >
     

        {/* TOGGLE DARK AND WHITE MODE */}
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            checked="false"
            onChange={toggleTheme}
          />
          <label class="form-check-label" for="flexSwitchCheckChecked">
            DARK MODE
          </label>
        </div>

        <ul
          className="navbar-nav mr-auto  p-2 "
          style={{ textalign: "center" }}
        >
          {token ? (
            <>
              <p>👤: Prasanna</p>
              <div className="d-flex justify-content-sm-around    ">
                <button
                  className="btn btn-danger btn-sm mx-3 "
                  onClick={() => {removeToken()
                  localStorage.removeItem("cartitem")
                  }}
                >
                  LOGOUT
                </button>
                <NavLink
                  className="btn btn-danger btn-sm mx-3 "
                  to="/mc"
                >MY CART <span style={{color:'white',backgroundColor:'black',padding:5,borderRadius:15}}>{num()}</span></NavLink>
                
              </div>
            </>
          ) : (
            <li className="nav-item btn btn-primary btn-sm text-white">
              <NavLink className="nav-link text-white" to="/auth">
                Login/Signup
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
