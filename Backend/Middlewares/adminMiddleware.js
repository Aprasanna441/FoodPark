import userModel from '../models/User.js'
import jwt from 'jsonwebtoken'
export const checkAdmin=async (req,res,next)=>{

    const {authorization}=req.headers 

     if (authorization && authorization.startsWith('Bearer')){
      try{
        const token=authorization.split(' ')[1]
        const {userID}=jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.user = await userModel.findById(userID)
        if (req.user.isAdmin){
            next()
        }
        else{
            res.status(401).send({ "status": "Failed", "message": e })
        }
      }
      catch(e){
        console.log(e)
      }
     }else{
        res.status(401).send({ "status": "Failed", "message": "Invalid Token" })
     }
}

