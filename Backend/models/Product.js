import mongoose, { mongo } from 'mongoose'

const productSchema=new mongoose.Schema({
    CategoryName:{type:String,required:true,trim:true},
    name:{type: String, required: true, trim: true },
    img: {type: String, required: true, trim: true },
    options:{type: String, required: true, trim: true },
    description:{type: String, required: true, trim: true }
})

const productModel=mongoose.model("Product",productSchema)
export default productModel;