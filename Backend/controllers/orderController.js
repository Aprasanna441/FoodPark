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
console.log(order._id)
      
      
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
        console.log(order._id)
          res.status(200).send({status:"Success",info:{id:order._id,total_amount:total_amount}})

        
    }


}




}






export const viewOrder=async (req,res)=>{
  const us=req.user.email 
  console.log(us)
  const data= await orderModel.find({email:us})
  // console.log(data)
  res.status(200).send({status:"Success",data:data})
}