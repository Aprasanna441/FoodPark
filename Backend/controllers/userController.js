import res from "express/lib/response.js";
import userModel from "../models/User.js";
import transporter from '../config/sendMail.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";

export const userSignup = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password").isStrongPassword().withMessage("Enter a strong password"),
  body("confirm_password")
    .isStrongPassword()
    .withMessage("Enter a strong password"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If there are validation errors, send an error response
      return res.status(422).send({ errors: errors.array() });
    }
    const { name, location, email, password, confirm_password, joined_on } =
      req.body;

    const user = await userModel.findOne({ email: { $eq: email } });
    
    if (user) {
      res
        .status(400)
        .send({ status: "Failed", message: "Email already exists" });
    } else {
      if (email && location && password && confirm_password) {
        if (password === confirm_password) {
          try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const user = new userModel({
              name: name,
              email: email,
              password: hashPassword,

              location: location,
            });
            await user.save();
            const newUser = await userModel.findOne({ email: email });
            const token = jwt.sign(
              { userID: newUser._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "5d" }
            );

            res.status(200).send({
              status: "Success",
              message: "User Registered",
              token: token,
            });
          } catch (e) {
            console.log(e);
            res.status(400).send({ status: "Failed", message: "Exception" });
          }
        } else {
          res.status(400).send({
            status: "Failed",
            message: "Password and Confirm password doesnt match",
          });
        }
      } else {
        res
          .status(400)
          .send({ status: "Failed", message: "No field can be empty" });
      }
    }
  },
];

export const userLogin = [
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
        if (user != null) {
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

export const changePassword = [
  
  body("password").isStrongPassword().withMessage("Enter A Strong Password"),
  body("confirm_password")
    .isStrongPassword()
    .withMessage("Enter A Strong  confirm Password"),
  async (req, res) => {
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If there are validation errors, send an error response
      return res.status(422).send({ errors: errors.array() });
    }
    try {
      console.log(req.body)
      const { password, confirm_password } = req.body;
      if (password && confirm_password) {
        if (password === confirm_password) {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
          await userModel.findByIdAndUpdate(req.user._id, {
            $set: { password: hashPassword },
          });
          res
            .status(200)
            .send({ status: "Success", message: "Password Changed Successfully" });
        } else {
          res
            .status(400)
            .send({ status: "Failed", message: "Password and confirm password didnt match" });
        }
      } else {
        res
          .status(400)
          .send({ status: "Failed", message: "No field can be empty" });
      }
    } catch (e) {
      console.log(e);
    }
  },
];

export const getUserInfo= async (req,res)=>{
  res.status(200).send({status:"Success",data:req.user})

}

export const sendResetEmail=async (req,res)=>{
  const { email } = req.body;
  console.log(req.body)
  if (email){
    const user = await userModel.findOne({ email: email });
    if(user){
      const secretWord=user._id +process.env.JWT_SECRET_KEY
      const token=jwt.sign({userID:user._id},secretWord,{expiresIn:'5d'})
      const resetLink=`http://127.0.0.1:3000/resetpassword/${user._id}/${token}`
      res.send({ status: "Success", message: "Check your email to reset password" });

      await transporter.sendMail({
        from:process.env.EMAIL_FROM,
        to:user.email,
        subject:"Reset Password",
        html:`<a href=${resetLink}>Click here to Reset Password</a>`
      })
    }
    else{
      res.send({ status: "Failed", message: "No user exist with this email" });
    }
  }
  else{
    res.send({ status: "Failed", message: "Enter a email to reset password" });
  }


}

export const resetPassword= async (req,res)=>{
const {password,confirm_password}=req.body
const {id,token}=req.params
if (password===confirm_password){
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  await userModel.findByIdAndUpdate(id,{
    $set:{password:hashPassword}
  })

  res.status(200).send({status:"Success",message:"Password Reset Success"})
}
else{
  res.status(400).send({status:"Failed",message:"Password and Confirm Password Doesnt match"})
}
}
