import res from "express/lib/response.js";
import userModel from "../models/User.js";
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
    .withMessage("Enter A Strong Password"),
  async (req, res) => {
    console.log(req.gu)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If there are validation errors, send an error response
      return res.status(422).send({ errors: errors.array() });
    }
    try {
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
