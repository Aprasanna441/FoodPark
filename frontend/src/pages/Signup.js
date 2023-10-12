import React from "react";
import { useState } from "react";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { TextField, Button } from "@mui/material";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";


const Signup = () => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirm_passwordError, setConfirmPasswordError] = useState("");
  const [nameError, setNameError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const actualData = {
      name:data.get("fullname"),
      location:data.get("location"),
      email: data.get("email"),
      password: data.get("password"),
      confirm_password: data.get("confirm_password"),
      tc:data.get("tc"),
    };
    actualData.name==""?setNameError("Enter Name"):setNameError("")
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
          name="Location"
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
          label="I agree  all the   "
          name="tc"
          required
          
          onChange={() => {}}
        />{" "}
        <a href="#">Terms and Conditions</a> <br />
        <Button variant="contained" sx={{ mt: 5 }} type="submit">
          Signup
        </Button>
      </Box>
    </>
  );
};

export default Signup;
