import express from 'express'
const router=express.Router()
import  {checkToken} from '../Middlewares/userMiddleware.js'
import { makeOrder,viewOrder } from '../controllers/orderController.js'




// middleware
router.get('/makeorder',checkToken)
router.post('/viewOrder',checkToken)

// protected routes
router.get('/makeorder',makeOrder)
router.post('/viewOrder',viewOrder)

export default router

