
import './App.css';
// import Login from "./pages/Login"
import Home from './pages/Home';
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
<BrowserRouter>


  
    <Routes>
      <Route  path="/" element={<Home/>}/>
      <Route  path="/auth" element={<SignupLogin/>}/>
      <Route  path="/auth" element={<SignupLogin/>}/>
    </Routes>
  
</BrowserRouter>


</>
  );
}

export default App;
