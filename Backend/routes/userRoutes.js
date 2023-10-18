import express from "express";
import { userSignup,userLogin,changePassword,resetPassword,sendResetEmail,getUserInfo } from "../controllers/userController.js";
import {checkToken} from "../Middlewares/userMiddleware.js"

const router=express.Router()


// /middleware
router.post('/changePassword',checkToken)
router.get('/getUserInfo',checkToken)


// Public route
router.post('/signup',userSignup)
router.post('/login',userLogin)
router.post('/sendresetemail',sendResetEmail)
router.post('/resetpassword/:id/:token',resetPassword)

// protected route
router.post('/changePassword',changePassword)
router.get('/getUserInfo',getUserInfo)





export  default router

