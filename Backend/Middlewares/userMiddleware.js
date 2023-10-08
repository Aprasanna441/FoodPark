import jwt from 'jsonwebtoken'
import UserModel from '../models/User.js'

export var checkToken= async (req,res,next)=>{
    let token;
    console.log(req.body)
    const {authorization}=req.headers
    if (authorization && authorization.startsWith('Bearer')){
        try{
            
            token=authorization.split(' ')[1]
            const {userID}=jwt.verify(token,process.env.JWT_SECRET_KEY)
            console.log(userID)
            req.user = await UserModel.findById(userID).select('-password')
            req.gu="Hello"
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