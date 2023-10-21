import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true       
    },
    location:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    joined_on:{
        type:Date,
        default:Date.now

    },
    isSeller:{
        type:Boolean,
        default:false,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false,
        required:true
    }
})

const userModel=mongoose.model("User",userSchema)
export default userModel