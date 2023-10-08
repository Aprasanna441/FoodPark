import express from "express";
import { userSignup } from "../controllers/userController.js";

const router=express.Router()


// /middleware


// Public route
router.post('/signup',userSignup)

// protected route



export  default router

