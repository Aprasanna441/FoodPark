import orderModel from "../models/Orders.js"
export const makeOrder= async (req,res)=>{
const {payment_method,delivery_address,status,order_data,phoneNumber,total_amount}=req.body
if (!( payment_method && delivery_address   && status && order_data)){
    res.status(400).send({status:"Failed",message:"Fields are Empty"})

}
else{
    if (payment_method ==="Cash In Hand"){
        
      const order=new orderModel({
        email:req.user.email,
        paymentMethod:payment_method,
        order_data:order_data,
        phoneNumber:phoneNumber,
        deliveryAddress:delivery_address,
        status:"Placed and Unpaid",
        totalPrice:total_amount
        
      })
      await order.save()

      
      
      res.status(200).send({status:"Success",message:"Successful"})
    }
    else{
        const order=new orderModel({
            email:req.user.email,
            paymentMethod:payment_method,
            order_data:order_data,
            phoneNumber:phoneNumber,
            deliveryAddress:delivery_address,
            status:"Placed and Unpaid",
            totalPrice:total_amount
          })
        await  order.save()
        
          res.status(200).send({status:"Success",info:{id:order._id,total_amount:total_amount}})

        
    }


}




}






export const viewOrder=async (req,res)=>{
  const us=req.user.email 

  const data= await orderModel.find({email:us})
  // console.log(data)
  res.status(200).send({status:"Success",data:data})
}

export const payOrder= async (req,res)=>{
    const {id}=req.body 

    
    
    if(id){
      await orderModel.findByIdAndUpdate(id,{
        $set:{status:"Placed and Paid"}
      })
    res.status(200).send({status:"Success",message:"Transaction Success Data saved"})
    }
    else{
      res.status(400).send({status:"Failed",message:"Transaction Failed .The flow was disrupted due to internet connection or any other."})
    }
}