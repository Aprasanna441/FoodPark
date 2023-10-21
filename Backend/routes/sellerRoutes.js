import express from 'express'
const router=express.Router()
import  {checkToken} from '../Middlewares/userMiddleware.js'
import { deliverFood,allOrders } from '../controllers/deliveryController.js'




// middleware
router.post('/deliverFood',checkToken)
router.get('/allorders',checkToken)


// protected routes
router.post('/deliverFood',deliverFood)
router.get('/allorders',allOrders)



export default router

