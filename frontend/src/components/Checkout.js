import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Input } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const navigate=useNavigate()
    const [location,setLocation]=useState("")
    const [method,setMethod]=useState("")
    const [error,setError]=useState("")

    const getLocation=()=>{
      console.log('hi')
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position)=>{
              console.log(position.coords.latitude,position.coords.longitude)
              setLocation(`${position.coords.latitude},${position.coords.longitude}`)
            }
          );
         
        } else { 
          setLocation("")
        }
      

    }



  const data = JSON.parse(localStorage.getItem("cartitem"));

  //total amount
  const totalPrice = () => {
    let sum = 0;
    data.forEach((element) => {
      sum += element.price;
    });

    return sum;
  };

  

  const submitHandler = async (e) => {
    e.preventDefault()
   

const dataa=new FormData(e.currentTarget)


const actualData={
    payment_method:method,
    delivery_address:location,
    phoneNumber:dataa.get("phone"),
    status:"Pending and Unpaid",
    order_data:data,
    total_amount:totalPrice()
    
}


    const res = await fetch("http://localhost:8080/api/orders/makeOrder", {
      method: "POST",
      body: JSON.stringify(actualData),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    const result = await res.json();
    if (result.status==="Failed"){
        setError("Failed to Order")
    }

    else{
        localStorage.removeItem("cartitem")
        if (dataa.get("method")=="Cash In Hand"){
          navigate('/')

        }
        else if (dataa.get("method")=="Cash In Hand"){
          navigate('/esewa',{state:{total_amount:result.info.total_amount,id:result.info.id}})
        }
        else{
      
         navigate('/khalti',{state:{total_amount:result.info.total_amount,id:result.info.id}})
        }
    }
  
  };


  
  return (
    <>
      <h1 style={{ textAlign: "center" }}>CHECKOUT FORM</h1>
      <h1 style={{color:"red",fontWeight:'bolder'}}>{error}</h1>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
        component="form"
        onSubmit={submitHandler}
                  sx={{
            width: "auto",
            height: 300,

            textAlign: "center",
            justifyContent: "center",
          }}
        >
          {/* //phone number */}

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Country"
            value="10"
            
          >
            <MenuItem value={10} selected>
              Nepal
            </MenuItem>
            <MenuItem value={20}>India</MenuItem>
            <MenuItem value={30}>Hongkong</MenuItem>
          </Select>
          <TextField
            id="outlined-basic"
            label="Phone Number"
            variant="outlined"
            name="phone"
          />
          <FormControl fullWidth>
            {/* age */}
            <br />

            <InputLabel id="demo-simple-select-label">Payment Method</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="payment method"
              value={method}
              onChange={(e)=>setMethod(e.target.value)}
              name="method"
            >
              <MenuItem value="Esewa">Esewa</MenuItem>
              <MenuItem value="Cash In Hand">Cash In Hand</MenuItem>
              <MenuItem value="Khalti">Khalti</MenuItem>
              
            </Select>
            <br />
            
            <TextField
            id="location"
            name="location"
            variant="outlined"
           label="Enter city,street and house number or longitude latitude"
           onChange={(e)=>setLocation(e.target.value)}
            
          />OR
          <Button variant="outlined" onClick={getLocation}>Get Current Location</Button> <br />
          <Button variant="contained" type="submit">Submit</Button>
           

          </FormControl>
          
        </Box>
      </div>
    </>
  );
};

export default Checkout;
