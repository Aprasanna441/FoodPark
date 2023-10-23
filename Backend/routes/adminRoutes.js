import express from 'express'
const router=express.Router()
import {checkAdmin} from "../Middlewares/adminMiddleware.js"
import { adminViewProduct ,adminLogin,getAdminData, getAllUsers,deleteUser,updateUser} from '../controllers/adminController.js'

// middleware
router.get('/allProducts',checkAdmin)
router.get('/getadmindata',checkAdmin)
router.get('/getallusers',checkAdmin)
router.delete('/deleteuser',checkAdmin)
router.patch('/updateuser',checkAdmin)

//protectedRoutes
router.get('/allProducts',adminViewProduct)
router.get('/getadmindata',getAdminData)
router.get('/getallusers',getAllUsers)
router.delete('/deleteuser',deleteUser)
router.patch('/updateuser',updateUser)

//public routes
router.post('/adminLogin',adminLogin)


export default router