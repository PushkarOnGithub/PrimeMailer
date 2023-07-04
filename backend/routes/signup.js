const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Creds = require("../models/Creds");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "helloU$er";
const { google } = require("googleapis");
let oauth2Client = require("../oauth2Client.js");
const OTPs = require("../models/OTPs");

const SixDigitRandomNumber = () => {
  return Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
};

router.post(
  "/credentials",
  [
    body("name", "Invalid Name").isLength({ min: 3 }),
    body("email", "Invalid Email").isEmail(),
    body("password", "Invalid Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // if there are errors, return Bad request and the errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ success: false, errors: result.array() });
    }
    // Check weather the user with the email exists already.
    try {
      const email = req.body.email;
      let user = await User.findOne({ email: email });
      if (user) {
        return res
          .status(400)
          .json({ success: false, error: "Email already Registered" });
      }
      if (!req.body.OTP) {
        const OTP = SixDigitRandomNumber();
        const { PythonShell } = require("python-shell");
        let pyshell = new PythonShell(
          "C:\\Users\\pushk\\React Projects\\primemailer\\backend\\routes\\python\\sendtestmail.py",
          { mode: "text", pythonOptions: ["-u"] }
        );
        pyshell.on("message", (message) => {
          console.log(message);
          if (message == "Invalid Email") {
            return res
              .status(400)
              .json({ success: false, error: "Invalid Email" });
          }
          else if(message == "Sent"){
            return res.status(200).json({success: true, message: "OTP Sent"})
          }
          else if(message == "OTP not sent"){
            return res.json(400).json({success: false, error: "OTP not sent"})
          }
        });
        pyshell.on("stderr", (stderr) => {
          console.log(stderr);
          return res
            .status(500)
            .json({ success: false, error: "internal server error" });
        });
        pyshell.send(OTP);
        pyshell.send(email);
        if( await OTPs.findOne({email: email})){
          const otp = await OTPs.findOneAndUpdate({email: email}, {OTP: OTP});
          if(!otp){
            return res.status(400).json({success: false, error: "OTP not sent"})
          }
        }
        else{
          const otp = await OTPs.create({
            email: email,
            OTP: OTP
          })
          if(!otp){
          return res.status(400).json({success: false, error: "OTP not sent"})
        }
      }
      
      } else {
        const otp = await OTPs.findOne({email: email});
        if(!otp){
          return res.status(400).json({success: false, error: "You have to SignUp first"})
        }
        if(otp.OTP != req.body.OTP){
          return res.status(400).json({success: false, error: "Invalid OTP"})
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
          name: req.body.name,
          password: secPass,
          email: req.body.email,
        });
        console.log(user);
        const authToken = jwt.sign(email, JWT_SECRET);
  
        res.json({
          success: true,
          authToken: authToken,
          name: user.name,
          picture: user.picture,
        });
      }

    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

router.get("/withgoogle/:authToken", async (req, res) => {
  authToken = req.params.authToken;
  try {
    email = jwt.verify(authToken, JWT_SECRET);
  } catch (error) {
    console.log(error.message);
    res.redirect(400, "http://127.0.0.1:5000/signup");
    return;
  }
  const creds = await Creds.findOne({ email: email });
  console.log("Creds : ", creds);
  if (!creds) {
    res.status(400).send("invalid credentials");
    return;
  }
  const userExists = await User.findOne({ email: email });
  console.log(userExists);
  if (!userExists) {
    const getUserProfile = async (email) => {
      try {
        oauth2Client.setCredentials({
          access_token: creds.access_token,
        });
        const response = await google
          .oauth2("v2")
          .userinfo.get({ auth: oauth2Client });
        const profile = response.data;
        console.log("User Profile:", profile);
        return profile;
      } catch (error) {
        console.error("Error retrieving user profile:", error.message);
        return false;
      }
    };

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(email, salt);
    const profile = await getUserProfile(email);
    if (profile) {
      let user = new User({
        name: profile.name,
        email: profile.email,
        password: secPass,
        picture: profile.picture,
      });
      try {
        user = user.save();
        res.json({
          success: true,
          authToken: authToken,
          name: user.name,
          picture: user.picture,
        });
      } catch (error) {
        console.log("cannot save user", error.message);
        res.redirect(400, "http://127.0.0.1:5000/signup");
      }
    }
  } else if (userExists) {
    res.json({
      success: true,
      authToken: authToken,
      name: userExists.name,
      picture: userExists.picture,
    });
  } else {
    res.status(400).send("invalid credentials");
  }
});

module.exports = router;
