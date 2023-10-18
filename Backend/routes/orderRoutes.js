import express from 'express'
const router=express.Router()
import  {checkToken} from '../Middlewares/userMiddleware.js'
import { makeOrder,viewOrder } from '../controllers/orderController.js'




// middleware
router.post('/makeorder',checkToken)
router.get('/vieworder',checkToken)

// protected routes
router.post('/makeorder',makeOrder)

router.get('/vieworder',viewOrder)

export default router

