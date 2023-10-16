
import './App.css';
import Home from './pages/Home';
import MyCart from './pages/MyCart';
import {CartProvider} from './Features/ContextReducer';
import { ThemeProvider } from './Features/ThemeReducer';

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
      <Route  path="/" element={<Home/>}/>
      <Route  path="/auth" element={<SignupLogin/>}/>
      <Route  path="/auth" element={<SignupLogin/>}/>
      <Route  path="/mc" element={<MyCart/>}/>

    </Routes>
  
</BrowserRouter>

</CartProvider>
</ThemeProvider>
</>
  );
}

export default App;
