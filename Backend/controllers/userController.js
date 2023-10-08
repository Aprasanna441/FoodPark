import res from "express/lib/response.js";
import userModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userSignup = async (req, res) => {
  const { name, location, email, password, confirm_password, joined_on } =
    req.body;

  const user = await userModel.findOne({ email: { $eq: email } });
  if (user) {
    res.status(400).send({ status: "Failed", message: "Email already exists" });
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

          res
            .status(200)
            .send({ status: "Success", message: "User Registered" ,token:token});
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
};
