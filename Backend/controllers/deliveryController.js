import deliveryModel from "../models/Delivery.js"
import orderModel from "../models/Orders.js"
export const  deliverFood= async (req,res)=>{


    const {orderId}=req.body
    const userid=req.user._id
    if (orderId ){

    
    
    const doc=new deliveryModel({
        order_id:orderId,
        deliveryMan:userid
    })
    await doc.save()
    await orderModel.findByIdAndUpdate(orderId, {
        $set: { status: "Delivered and Paid" },
      });
    res.status(200).send({status:"Success",message:"Saved"})
}
else{
    res.status(400).send({status:"Failed",message:"No order Id passed"})
}



}

export const allOrders=async (req,res)=>{
 const data=await  orderModel.find()
 res.status(200).send({status:"Success",data:data})
}