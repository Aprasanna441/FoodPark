import orderModel from "../models/Orders.js"
export const makeOrder= async (req,res)=>{
const {payment_method,delivery_address,status,order_data,phoneNumber}=req.body
if (!( payment_method && delivery_address && status && order_data)){
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
        status:"Placed and Unpaid"
      })
      await order.save()
      res.status(200).send({status:"Success",message:"Haat mai deu"})
    }
    else{
        res.status(200).send({status:"Success",message:"Onlientirdeu"})
    }


}



}



export const viewOrder=(req,res)=>{

}