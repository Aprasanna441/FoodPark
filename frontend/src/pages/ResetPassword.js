import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Input } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useParams } from 'react-router-dom';

const ResetPassword = (props) => {
    
    const navigate=useNavigate()
    const { token, id } = useParams();
    console.log(id)
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const handleChange = async (e) => {
    e.preventDefault()
const dataa=new FormData(e.currentTarget)
const actualData={
   password:dataa.get("password"),
   confirm_password:dataa.get("confirm_password")
    
}

    const res = await fetch(
      `http://localhost:8080/api/account/resetPassword/${id}/${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
         
        },
        
        body: JSON.stringify(actualData),
      }
    );
    const result = await res.json();
    console.log(result)

    if (result.status === "Failed") {
      setError(<h1 style={{color:'red',fontWeight:'bolder'}}>{result.message}</h1>);
    } else {
      setMessage(<h1 style={{color:'green',fontWeight:'bolder'}}>{result.message}</h1>);
      setTimeout(() => {
        localStorage.removeItem("authToken")
        navigate('/auth')
      }, 5000);
    }
  };

  return (
    <>
      {" "}
      <h1 style={{textAlign:'center'}}>Change Password</h1>
      {error}
      <h1 style={{ color: "red", fontWeight: "bolder",textAlign:'center' }}>{error}</h1>
      <h1 style={{ color: "color", fontWeight: "bolder",textAlign:'center' }}>{message}</h1>
      <Box
        component="form"
        onSubmit={handleChange}
        sx={{
          width: "auto",
          height: 300,

          textAlign: "center",
          justifyContent: "center",
        }}
      >
        {/* //phone number */}

        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          name="password"
          type="password"
        />
       
  
          <br />

          <br />

          <TextField
            id="location"
            name="confirm_password"
            variant="outlined"
            label="Password Confirm"
            type="password"
          />
<br /> <br />
          <Button variant="contained" type="submit">
            Reset
          </Button>
        
      </Box>
    </>
  );
};

export default ResetPassword;
