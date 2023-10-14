import { Schema } from "mongoose";

const categorySchema=mongoose.newSchema({
    category:{type:String}
})

const categoryModel=new Model("category",categorySchema)
export default categoryModel