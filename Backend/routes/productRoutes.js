import express from "express";

const router=express.Router();
import { showProduct } from "../controllers/productController.js";


//middlewares



//public routes
router.get('/allproducts',showProduct)


//protected routes


export default router