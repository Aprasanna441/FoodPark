import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state,action.payload]
    case "REMOVE":
      return [...state, [action.data]];
    
    default:
    
      console.log("No ac selected");
  }
};

 export const  CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  
  return (
   
      <CartContext.Provider value={{ state, dispatch }}>
        {children}
      </CartContext.Provider>
   
  );
};


export const useCart = () =>{return useContext(CartContext);}


