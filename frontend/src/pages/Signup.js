import React from "react";
import { useState } from "react";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { TextField, Button } from "@mui/material";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import  {storeToken} from "../services/localStorage"
const Signup = () => {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirm_passwordError, setConfirmPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [serverError,setServerError]=useState('')

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const actualData = {
      name:data.get("fullname"),
      location:data.get("location"),
      email: data.get("email"),
      password: data.get("password"),
      confirm_password: data.get("confirm_password"),
      
    };
    actualData.name===""?setNameError("Enter Name"):setNameError("")
    isEmail(actualData.email)
      ? setEmailError("")
      : setEmailError("Enter a proper Email");
    isStrongPassword(actualData.password, { minLength: 8 })
      ? setPasswordError("")
      : setPasswordError("Enter a  min 8 digit alphanumeric password");
    isStrongPassword(actualData.confirm_password, { minLength: 8 })
      ? setPasswordError("")
      : setConfirmPasswordError("Enter a  min 8 digit alphanumeric password");
    actualData.confirm_password!==passwordError? setPasswordError("")
    : setConfirmPasswordError("Confirm Password Please");

    if (! (emailError && nameError && passwordError && confirm_passwordError)){
     const res= await fetch("http://localhost:8080/api/account/signup",{
     method:"POST",
     headers: {
      "Content-Type": "application/json",
    },
     body:JSON.stringify(actualData)
    }
     )

     const result = await res.json();
    if (result.status==="Success"){
      storeToken(result.token)
      navigate('/')
    }
    else{
      setServerError(result.message)
    }
    }
  };
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Signup</h1>
      <Box
        component="form"
        sx={{ textAlign: "center" }}
        noValidate
        autoComplete="off"
        style={{ marginTop: "24px" }}
        onSubmit={submitHandler}
      >
        <p style={{color:"red",fontWeight:'bolder'}}>{nameError}</p>
        <TextField
          id="standard-basic"
          label="Full Name"
          variant="standard"
          required
          
        
          name="fullname"
        />{" "}
        <br />
        
        <TextField
          id="standard-basic"
          label="Location"
          variant="standard"
          required
          name="location"
        />{" "}
        <br />
        <p style={{color:"red",fontWeight:'bolder'}}>{emailError}</p>
        <TextField
          id="standard-basic"
          label="Email"
          variant="standard"
       
          required
          
          name="email"
        />{" "}
        <br />
        <p style={{color:"red",fontWeight:'bolder'}}>{passwordError}</p>
        <TextField
          id="standard-basic"
          label="Password"
          variant="standard"
          required
         
          full
          name="password"
        />{" "}
        <br />
        <p style={{color:"red",fontWeight:'bolder'}}>{confirm_passwordError}</p>
        <TextField
          id="standard-basic"
          label="Confirm Password"
          variant="standard"
          required
        
          full
          name="confirm_password"
        />{" "}
        <br />
        <FormControlLabel
          control={<Checkbox />}
          label="I agree  all the"
          name="tc"
          required
          
          onChange={() => {}}
        />{" "}
        <NavLink to="/">Terms and Conditions</NavLink> <br />
        <Button variant="contained" sx={{ mt: 5 }} type="submit">
          Signup
        </Button>
        <p style={{color:'red',fontWeight:'bolder'}}>{serverError}</p>
        
      </Box>
    </>
  );
};

export default Signup;
