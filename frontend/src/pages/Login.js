import React, { useRef, useState } from 'react'
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import {TextField} from '@mui/material';
import {Button} from '@mui/material';
import isEmail from 'validator/lib/isEmail';
import isStrongPassword from 'validator/lib/isStrongPassword'
import { useNavigate } from 'react-router-dom';
import { NavLink, Navigate } from 'react-router-dom';
import {storeToken} from '../services/localStorage'

const Login = () => {
  const navigate=useNavigate()
  const [message,setMessage]=useState('')
  const [emailError,setEmailError]=useState('')
  const [passwordError,setPasswordError]=useState('')
  const [serverError,setServerError]=useState('')
  const [inputBox,toggleInputBox]=useState(false)



  const forgetPassword= async (e)=>{
    e.preventDefault()
const data=new FormData(e.currentTarget)
console.log(data.get("forgetemail"))
const actualData={
  email:data.get("forgetemail")
}
 const res=await fetch("http://localhost:8080/api/account/sendresetemail",{
  method:"POST",
  headers:{
    'Content-Type':'application/json'
    },
  body:JSON.stringify(actualData)
 })
 const result= await res.json()
 
 if (result.status=="Failed"){
   setMessage(<h1 style={{color:'red',fontWeight:'bolder'}}>{result.message}</h1>)
 }
 else{
setMessage(<h1 style={{color:'green',fontWeight:'bolder'}}>{result.message}</h1>)
 }



  }

  
    
   
   



 

  const submitHandler= async (e)=>{
   
    e.preventDefault()

    const data=new FormData(e.currentTarget)
    
    
    const actualData={
      email:data.get("email"),
      password:data.get("password")
    }
    isEmail(actualData.email)?setEmailError(""):setEmailError("Enter a proper Email")
    isStrongPassword(actualData.password,{minLength:8})?setPasswordError(""):setPasswordError("Enter a  min 8 digit alphanumeric password")
    
    
   if (!(emailError && passwordError)){
    const res=await fetch('http://localhost:8080/api/account/login',{
      method:"POST",
      headers:{
      'Content-Type':'application/json'
      },
      body:JSON.stringify(actualData)

    })
    const result=await res.json()
    console.log(result)
    if( result.status=="Success"){
      storeToken(result.token)
      navigate('/')
    }
    else{
      setServerError(result.message)
     
    }
   }
 

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
<NavLink  onClick={()=>toggleInputBox(!inputBox)}>Forget Password</NavLink>
<br />
{inputBox?
<Box component="form"
        sx={{ textAlign: "center" }}
        noValidate
        autoComplete="off"
        style={{ marginTop: "24px" }}
        onSubmit={forgetPassword}>
            <TextField
          id="standard-basic"
          label="Email"
         
          variant="standard"
          
          required
          full
          name="forgetemail"
        />
        {message}
        <Button variant='contained'

sx={{mt:5}}
type="submit"

>Send Me Reset Password Link</Button>

</Box>
:""}
        <p style={{color:'red',fontWeight:'bolder'}}>{serverError}</p>
    </>
  )
}

export default Login