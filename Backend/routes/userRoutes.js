import express from "express";
import { userSignup,userLogin,changePassword } from "../controllers/userController.js";
import {checkToken} from "../Middlewares/userMiddleware.js"

const router=express.Router()


// /middleware
router.post('/changePassword',checkToken)


// Public route
router.post('/signup',userSignup)
router.post('/login',userLogin)

// protected route
router.post('/changePassword',changePassword)




export  default router

