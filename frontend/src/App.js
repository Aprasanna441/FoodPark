
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

function App() {
  return (
<>
<ThemeProvider>
<CartProvider>
<BrowserRouter>


  
    <Routes>
      <Route  path="/" element={<Layout/>}>
      <Route  path="/" element={<Home/>}/>
      
      <Route  path="/mc" element={<MyCart/>}/>
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
