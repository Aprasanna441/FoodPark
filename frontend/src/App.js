
import './App.css';
// import Login from "./pages/Login"
import Home from './pages/Home';
import {
  Routes, 
  Router,
  Route,
  BrowserRouter
 
} from "react-router-dom";
import Login from "./pages/Login"

function App() {
  return (
<>
<BrowserRouter>


  
    <Routes>
      <Route  path="/" element={<Home/>}/>
      <Route  path="/login" element={<Login/>}/>
    </Routes>
  
</BrowserRouter>


</>
  );
}

export default App;
