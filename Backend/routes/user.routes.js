const express = require("express");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const userModel = require("../models/user.model");

const userRoutes = express.Router();

userRoutes.post("/signup", async (req, res) => {

  const { email, password, name } = req.body;
  const hash = await argon2.hash(password);
  try {
    if (email && password) {
      let userExistOrNot = await userModel.find({ email });
      if (userExistOrNot.length !== 0) {
        return res.status(200).send({
          message: "User Already Exists",
          data: userExistOrNot[0],
        });
      }

      let createUser = new userModel({
        email,
        name,
        password: hash,
      });
      await createUser.save();

      return res.status(201).send({
        message: "User Created Successfully",
        data: createUser,
      });
    } else {
      return res.status(400).send({
        message: "Please Fill All Details",
        data: [],
      });
    }
  } catch (e) {
    console.log(e.message);
    return res.status(401).send({
      message: "Error Occurs",
      data: [],
      desc: e.message,
    });
  }
});


userRoutes.post("/login", async (req, res) => {

  const { email, password } = req.body;
  console.log("email, password:", email, password);
  try {
    const userExistOrNot = await userModel.findOne({ email });

    if (userExistOrNot.length === 0) {
      return res.status(400).send({
        message: "User With this Email Does Not Exist",
      });
    }

    if (await argon2.verify(userExistOrNot.password, password)) {
      const access_token = jwt.sign(
        { _id: userExistOrNot._id, email: userExistOrNot.email, name: userExistOrNot.name },
        "PAYPAL_27",
        { expiresIn: "4days" }
      );

      const refresh_token = jwt.sign(
        { _id: userExistOrNot._id },
        "PAYPAL_27_REFRESH",
        { expiresIn: "7days" }
      );

      return res
        .status(201)
        .send({ message: "Login Successfully!", access_token, refresh_token });
    } else {
      return res.status(203).send({
        message: "Wrong Credentials",
      });
    }
  } catch (e) {
    console.log(e.message);
    return res.status(401).send({
      message: "Error Occurs",
      desc: e.message,
    });
  }
});

userRoutes.post("/verify", async (req, res) => {
  const { token } = req.body;
  if (token === undefined) {
    return res.send("Unauthorized");
  }
  try {
    const verification = jwt.verify(token, "PAYPAL_27");
    if (verification) {
      return res.status(200).send(verification);
    }
  } catch (e) {
    console.log("e:", e.message);
    return res.status(403).send({ message: "Access Token Expired!" });
  }
});

userRoutes.get("/", async (req, res) => {

  try {
    let data = await userModel.find({}, { password: 0 })
    return res.status(200).send({
      message: "All Users",
      data
    })
  } catch (e) {
    console.log("e:", e.message);
    return res.status(403).send({ message: "Access Token Expired!" });
  }
})

module.exports = userRoutes;