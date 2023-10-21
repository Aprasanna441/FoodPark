import mongoose, { mongo } from "mongoose";
import { Schema } from "mongoose";

const deliverySchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true,
    
  },
  
    orderTime: {
      type: Date,
      default: Date.now,
    },
    deliveryMan:{
        type: String,
    required: true,
    }

  },
);

const deliveryModel = mongoose.model("delivery", deliverySchema);
export default deliveryModel;
