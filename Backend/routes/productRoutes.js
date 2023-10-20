import express from "express";

const router=express.Router();
import { showProduct,searchProduct } from "../controllers/productController.js";


//middlewares



//public routes
router.get('/allproducts',showProduct)
router.get('/searchproducts',searchProduct)


//protected routes


export default router