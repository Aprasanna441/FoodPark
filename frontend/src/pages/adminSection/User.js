import React, { useEffect, useState } from 'react'

const User = () => {
  const [modal,setModal]=useState(false)
  const [modalData,setModalData]=useState([])
const [data,setData]=useState([])
  const getUserData= async ()=>{
    
const res=await fetch("http://localhost:8080/api/admin/getallusers",{
  method:'GET',
  headers:{
  "authorization":`Bearer ${localStorage.getItem("authToken")}`,
  'Content-Type':"application/json"
  },

})
const result=await res.json()
setData(result.data)
  }


  const deleteUser= async (id)=>{
    const res=await fetch('http://localhost:8080/api/admin/deleteuser',{
     method:"DELETE",
     headers:{
       'authorization':`Bearer ${localStorage.getItem("authToken")}`,
       'Content-Type':'application/json'
     },
     body:JSON.stringify({id:id})
    
 
    })
  }

  useEffect(()=>{
    getUserData()
  })
  return (
    <>
    <h1 style={{textAlign:'center'}}>USER MANAGEMENT </h1>
    <button className='btn btn-primary' onClick={()=>setModal(!modal)}>CLOSE</button>
{!modal?
  <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Designation</th>
    </tr>
  </thead>
  <tbody>
    {data.map((item,index)=>
    <tr>
      <th scope="row">{index+1}</th>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{item.isSeller?"Seller":item.isAdmin?"Admin":"User"}</td>
      <td><button className='btn btn-primary btn-sm' 
      onClick={()=>{setModalData(item)
         setModal(!modal)}}>
          EDIT</button> <button className='btn btn-danger' onClick={()=>deleteUser(item._id)}>X</button></td>
    </tr>
    )}
    <userModal/>
 
  </tbody>
</table>
:<UserModal props={modalData}/>}

    </>

  )
}


export default User

const UserModal = ({props}) => {
  const [email,setEmail]=useState(props.email)
  const [name,setName]=useState(props.name)
  const [admin,setAdmin]=useState(props.isAdmin)
  const [address,setLocation]=useState(props.location)
  const [message,setMessage]=useState('')
  
  const [seller,setSeller]=useState(props.isSeller)
  
  const updateUser= async ()=>{
   const res=await fetch('http://localhost:8080/api/admin/updateuser',{
    method:"PATCH",
    headers:{
      'authorization':`Bearer ${localStorage.getItem("authToken")}`,
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      id:props._id,
      email:email,
      name:name,
      location:address,
      isAdmin:admin,
      isSeller:seller
    })

   })
   const result=await res.json()
   if (result.status==="Succes"){
      setMessage(result.message)
   }
   else{

   }
  }
  
  return (
    <div>
      {message}
    {seller?"True":"False"}
      <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e)=>setEmail(e.target.value)}/>
    <label for="exampleInputEmail1">Name</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={name} onChange={(e)=>setName(e.target.value)}/>
    <label for="exampleInputEmail1">Address</label>
    <input type="address" class="form-control" id="address" aria-describedby="emailHelp" value={address} onChange={(e)=>setLocation(e.target.value)}/>
    <label htmlFor="isAdmin">IsAdmin</label>
    <input  checked={admin} onClick={()=>setAdmin(!admin)} id="isAdmin" type="checkbox" />
    <label htmlFor="isSeller">IsSeller</label>
    <input  checked={seller} onClick={()=>setSeller(!seller)} id="isSeller" type="checkbox" />
    <button className='btn btn-primary' onClick={updateUser}>Submit</button>
  </div>
 

  
</form>
       
    </div>
  )
}

