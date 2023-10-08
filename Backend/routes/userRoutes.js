import express from "express";
import { userSignup,userLogin } from "../controllers/userController.js";

const router=express.Router()


// /middleware


// Public route
router.post('/signup',userSignup)
router.post('/login',userLogin)

// protected route



export  default router

