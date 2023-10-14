import mongoose, { mongo } from 'mongoose'


const menuSchema = new mongoose.Schema({
    type: String,
    price: Number,
  });
  
const productSchema=new mongoose.Schema({
    CategoryName:{type:String,required:true,trim:true},
    name:{type: String, required: true, trim: true },
    img: {type: String, required: true, trim: true },
    options:[menuSchema],
    description:{type: String, required: true, trim: true }
})

const productModel=mongoose.model("product",productSchema)
export default productModel;