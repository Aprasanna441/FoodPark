import res from "express/lib/response.js";
import productModel from "../models/Product.js"


export const showProduct= async (req,res)=>{
    const data=await productModel.find()

    res.status(200).send({message:"namasete",data:data})
}



