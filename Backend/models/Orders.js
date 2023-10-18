import mongoose, { mongo } from "mongoose";
import { Schema } from "mongoose";

const orderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    
  },
  order_data: {
    type: Array,
    required: true
}
    ,
    paymentMethod: String,
    orderTime: {
      type: Date,
      default: Date.now,
    },
    phoneNumber:String,
    deliveryAddress: String,
    status: String,
    totalPrice:Number
  },
);

const orderModel = mongoose.model("order", orderSchema);
export default orderModel;
