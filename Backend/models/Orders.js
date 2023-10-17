import mongoose, { mongo } from "mongoose";
import { Schema } from "mongoose";

const orderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
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
    deliveryAddress: String,
    status: String,
  },
);

const orderModel = mongoose.model("order", order);
export default orderModel;
