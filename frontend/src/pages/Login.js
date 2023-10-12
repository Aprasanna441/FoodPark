import React, { useRef, useState } from 'react'
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import {TextField} from '@mui/material';
import {Button} from '@mui/material';
import isEmail from 'validator/lib/isEmail';
import isStrongPassword from 'validator/lib/isStrongPassword'



const Login = () => {
  
  const [emailError,setEmailError]=useState('')
  const [passwordError,setPasswordError]=useState('')


  
    
   
   



 

  const submitHandler= async (e)=>{
   
    e.preventDefault()

    const data=new FormData(e.currentTarget)
    
    
    const actualData={
      email:data.get("email"),
      password:data.get("password")
    }
    isEmail(actualData.email)?setEmailError(""):setEmailError("Enter a proper Email")
    isStrongPassword(actualData.password,{minLength:8})?setPasswordError(""):setPasswordError("Enter a  min 8 digit alphanumeric password")
    
    
   
 

  }

  


  return (
    <>
    <h1 style={{textAlign:'center'}}>Login</h1>
 <Box
        component="form"
        sx={{ textAlign: "center" }}
        noValidate
        autoComplete="off"
        style={{ marginTop: "24px" }}
        onSubmit={submitHandler}
        
      >
       
        
        <br />
        <p style={{color:"red",fontWeight:'bolder'}}>{emailError}</p>
        <TextField
          id="standard-basic"
          label="Email"
          
          variant="standard"
         
          required
          type="email"
          
       
          name="email"
        />{" "}   <br />
        <p style={{color:"red",fontWeight:'bolder'}}>{passwordError}</p>
        <TextField
          id="standard-basic"
          label="Password"
         
          variant="standard"
          type="password"
          required
          full
          name="password"
        /> <br />
 
<Button variant='contained'

sx={{mt:5}}
type="submit"

>Login</Button>

        </Box>
    </>
  )
}

export default Login