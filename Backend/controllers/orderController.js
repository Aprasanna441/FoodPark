export const makeOrder=(req,res)=>{
const {payment_method,delivery_address,status,order_data}=req.body
res.status(200).send({status:"failed",message:"Namaste",data:order_data})
}

export const viewOrder=(req,res)=>{

}