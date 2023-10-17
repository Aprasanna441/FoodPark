
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
      
      <Route  path="/mc" element={localStorage.getItem("authToken")?<MyCart/>:<Home/>}/>
        </Route>
      <Route  path="/auth" element={<SignupLogin/>}/>
      <Route  path="/auth" element={<SignupLogin/>}/>

    </Routes>
  
</BrowserRouter>

</CartProvider>
</ThemeProvider>
</>
  );
}

export default App;
