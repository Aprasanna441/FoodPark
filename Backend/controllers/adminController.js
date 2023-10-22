import productModel from '../models/Product.js'
import userModel from '../models/User.js'
import { body, validationResult } from "express-validator";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const adminLogin = [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isStrongPassword().withMessage("Enter a strong password"),
  
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // If there are validation errors, send an error response
        return res.status(422).send({ errors: errors.array() });
      }
      try {
        const { email, password } = req.body;
        if (email && password) {
          const user = await userModel.findOne({ email: { $eq: email } });
          if (user != null  ){
               if (user.isAdmin)
                {
                    
                    const isMatched = await bcrypt.compare(password, user.password);
                    if (isMatched) {
                      const token = jwt.sign(
                        { userID: user._id },
                        process.env.JWT_SECRET_KEY,
                        { expiresIn: "5d" }
                      );
                      res.status(200).send({
                        token: token,
                        status: "Success",
                        message: "Login Success",
                      });
                    } else {
                      res.send({
                        status: "Failed",
                        message: "Email or Password not valid",
                      });
                    }
               }
               else{
                   res.send({ status: "Failed", message: "Not a registered Admin" });

               }


          } else {
            res.send({ status: "Failed", message: "Not a registered user" });
          }
        } else {
          res.send({
            status: "Failed",
            message: "None of the field can be empty",
          });
        }
      } catch (e) {
        console.log(e);
        res.status(400).send({ status: "Failed", message: "Exception" });
      }
    },
  ];


export const adminViewProduct=async (req,res)=>{
    const data=await productModel.find()
    return res.status(200).send({status:"Success",data:data})
 }

 export const getAdminData=async (req,res)=>{
   console.log("admin")
 
  res.status(200).send({status:"Success",data:req.user})

}