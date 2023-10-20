import res from "express/lib/response.js";
import productModel from "../models/Product.js"


export const showProduct= async (req,res)=>{
    const data=await productModel.find()

    res.status(200).send({message:"namasete",data:data})
}

export const searchProduct=async (req,res)=>{
const para=req.query.q


const result=await productModel.find({'name':{'$regex': para,'$options': 'i'}})
res.status(200).send({status:"Success",data:result})
}

