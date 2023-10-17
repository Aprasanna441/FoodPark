import express from 'express'
const router=express.Router()
import  {checkToken} from '../Middlewares/userMiddleware.js'
import { makeOrder,viewOrder } from '../controllers/orderController.js'




// middleware
router.post('/makeorder',checkToken)
router.get('/viewOrder',checkToken)

// protected routes
router.post('/makeorder',makeOrder)
router.get('/viewOrder',viewOrder)

export default router

