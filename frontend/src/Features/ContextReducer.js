import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const data=[...state,action.payload]
      
      localStorage.setItem("cartitem",JSON.stringify(data))
      return [...state,action.payload]
    case "REMOVE":
      let newArr= [...state]
      newArr.splice(action.index,1)
      localStorage.setItem("cartitem",JSON.stringify(newArr))
      return newArr
    case "INCREASE":
      let arr=[...state]
      arr.splice(action.index,1,action.payload)
      



      
      
      localStorage.setItem("cartitem",JSON.stringify(arr))
      return arr
    case "DECREASE":
      let arrDecr=[...state]
      arrDecr.splice(action.index,1,action.payload)
      



      
      
      localStorage.setItem("cartitem",JSON.stringify(arrDecr))
      return arrDecr


     
    
    default:
    
      
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


