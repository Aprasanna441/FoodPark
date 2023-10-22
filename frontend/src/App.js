
import './App.css';
import Home from './pages/Home';
import MyCart from './pages/MyCart';
import {CartProvider} from './Features/ContextReducer';
import { ThemeProvider } from './Features/ThemeReducer';
import Layout from './pages/Layout';
import Admin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'


import {
  Routes, 
  Router,
  Route,
  BrowserRouter
 
} from "react-router-dom";
import SignupLogin from './pages/SignupLogin';
import Dashboard from './pages/Dashboard';
import Checkout from './components/Checkout';
import Esewa from './pages/Esewa';
import Khalti from './pages/Khalti';
import MyOrders from './pages/MyOrders';
import ChangePassword from './pages/ChangePassword';
import ResetPassword from './pages/ResetPassword';
import KhaltiVerify from './pages/KhaltiVerify';
import Categorical from './pages/Categorical';
import Delivery from './pages/Delivery';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {

  const [admin,setIsAdmin]=useState(false)
  const isAuthenticated= async ()=>{
  const res=await fetch("http://localhost:8080/api/admin/getadmindata",
  {
      method:"GET",
      headers:{
          'Content-Type':'application/json',
          'authorization':`Bearer ${localStorage.getItem("authToken")}`
      }
  })

const result= await res.json()
console.log(result)
if ( !result.data){
  setIsAdmin(false)
}
else{
  setIsAdmin(true)
}
  }
 
  useEffect(()=>{
    isAuthenticated()
  },)
  return (
<>
<ThemeProvider>
<CartProvider>
<BrowserRouter>


  
    <Routes>
      <Route  path="/" element={<Layout/>}>
      <Route  path="/" element={<Home/>}/>
      <Route  path="/categories" element={<Categorical/>}/>
      <Route  path="/success" element={<Success/>}/>
      <Route  path="/fail" element={<Failure/>}/>
      <Route  path="/resetpassword/:id/:token" element={<ResetPassword/>}/>
      <Route  path="/Khaltiverify" element={<KhaltiVerify/>}/>
      <Route  path="/dashboard" element={localStorage.getItem("authToken")?<Dashboard/>:<Home/>}/>
      <Route  path="/delivery" element={localStorage.getItem("authToken")?<Delivery/>:<Home/>}/>
      <Route  path="/checkout" element={localStorage.getItem("authToken")?<Checkout/>:<Home/>}/>
      <Route  path="/myorders" element={localStorage.getItem("authToken")?<MyOrders/>:<Home/>}/>
      <Route  path="/changepassword" element={localStorage.getItem("authToken")?<ChangePassword/>:<Home/>}/>

      
      <Route  path="/mc" element={localStorage.getItem("authToken")?<MyCart/>:<Home/>}/>
        </Route>
      <Route  path="/auth" element={<SignupLogin/>}/>
      
      <Route  path="/esewa" element={<Esewa/>}/>
      <Route  path="/Khalti" element={<Khalti/>}/>
      <Route  path="/adminlogin" element={<Admin/>}/>
      <Route  path="/admindashboard" element={admin?<AdminDashboard/>:<Admin/>} />
   


    </Routes>
  
</BrowserRouter>

</CartProvider>
</ThemeProvider>
</>
  );
}



const Success = () => {
  return (
    <div>Success</div>
  )
}

const Failure = () => {
  return (
    <div>Failure</div>
  )
}



export default App;
