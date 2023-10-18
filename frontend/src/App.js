
import './App.css';
import Home from './pages/Home';
import MyCart from './pages/MyCart';
import {CartProvider} from './Features/ContextReducer';
import { ThemeProvider } from './Features/ThemeReducer';
import Layout from './pages/Layout';

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

function App() {
  return (
<>
<ThemeProvider>
<CartProvider>
<BrowserRouter>


  
    <Routes>
      <Route  path="/" element={<Layout/>}>
      <Route  path="/" element={<Home/>}/>
      <Route  path="/dashboard" element={localStorage.getItem("authToken")?<Dashboard/>:<Home/>}/>
      <Route  path="/checkout" element={localStorage.getItem("authToken")?<Checkout/>:<Home/>}/>
      
      <Route  path="/mc" element={localStorage.getItem("authToken")?<MyCart/>:<Home/>}/>
        </Route>
      <Route  path="/auth" element={<SignupLogin/>}/>
      <Route  path="/auth" element={<SignupLogin/>}/>
      <Route  path="/esewa" element={<Esewa/>}/>

    </Routes>
  
</BrowserRouter>

</CartProvider>
</ThemeProvider>
</>
  );
}

export default App;
