import jwt from 'jsonwebtoken'
import userModel from '../models/User.js'


export var checkToken= async (req,res,next)=>{
    let token;
    
    const {authorization}=req.headers
    if (authorization && authorization.startsWith('Bearer')){
        try{
            
            token=authorization.split(' ')[1]
            const {userID}=jwt.verify(token,process.env.JWT_SECRET_KEY)
            console.log("ejr")
            console.log("Hi",userID)
            req.user = await userModel.findById(userID).select('-password')
            
            next()
        }
        catch(e){
            console.log(e)
            res.status(401).send({ "status": "failed", "message": "Exception" })
        }
    }
    else{
       
        res.status(401).send({ "status": "failed", "message": "Unauthorized User" })
    }

}