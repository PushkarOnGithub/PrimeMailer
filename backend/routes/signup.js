const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Creds = require("../models/Creds");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const host = "http://127.0.0.1:3000";
const JWT_SECRET = "helloU$er";
const { google } = require("googleapis");
let oauth2Client = require("./oauth2Client.js");
const OTPs = require("../models/OTPs");

// Function to generate 6 digit random number
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
    // check for correct input and if there are errors, return Bad request and the errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ success: false, errors: result.array() });
    }
    // Check weather the user with the email exists already.
    try {
      const email = req.body.email;
      let user = await User.findOne({ email: email });
      if (user) {
        // if user already exists redirect to login.
        return res
          .status(400)
          .json({ success: false, error: "Email already Registered" });
      }
      // if the body dont have OTP send one by email and save the OTP to the DB
      if (!req.body.OTP) {
        const OTP = SixDigitRandomNumber();

        // sending email by python containing an OTP

        const { PythonShell } = require("python-shell");
        let pyshell = new PythonShell(
          "C:\\Users\\pushk\\React Projects\\primemailer\\backend\\routes\\python\\SendOtpMail.py",
          { mode: "text", pythonOptions: ["-u"] }
        );

        // send OTP generated and email to python script and wait for response from the script

        pyshell.send(OTP);
        pyshell.send(email);

        pyshell.on("message", (message) => {
          console.log("Python Message : ", message);

          // if email doesn't exist send 400 error response

          if (message == "Invalid Email") {
            return res
              .status(400)
              .json({ success: false, error: "Invalid Email" });
          }

          // if OTP is sent send a 200 ok response
          else if (message == "Sent") {
            return res.status(200).json({ success: true, message: "OTP Sent" });
          }

          // if OTP is not sent send a 500 internal server error response
          else if (message == "OTP not sent") {
            return res
              .status(500)
              .json({ success: false, error: "OTP not sent" });
          }
        });
        pyshell.on("stderr", (stderr) => {
          console.log("Python Error : ", stderr);

          // if there is some error in python script
          return res
            .status(500)
            .json({ success: false, error: "internal server error" });
        });
        // check if the user exists already meaning user has requested another OTP before first expired

        if (await OTPs.findOne({ email: email })) {
          // if user exists then update the OTP with new one

          if (
            !(await OTPs.findOneAndUpdate(
              { email: email },
              { OTP: OTP, expireAt: new Date(Date.now()) }
            ))
          ) {
            // if otp is not saved then maybe Mongo is not connected. internal server error

            return res
              .status(500)
              .json({ success: false, error: "OTP not sent" });
          }
        }
        // if user is requesting the otp for the first time or previous one has expired.
        else {
          // create a new OTPs object
          const otp = await OTPs.create({
            email: email,
            OTP: OTP,
          });
          // if otp is not saved then maybe Mongo is not connected. internal server error
          if (!otp) {
            return res
              .status(500)
              .json({ success: false, error: "OTP not sent" });
          }
        }
        // if body contain an OTP then verify it with the saved one from the DB
      } else {
        // get the OTP saved
        const otp = await OTPs.findOne({ email: email });
        if (!otp) {
          // if user took too long to enter OTP means OTP has expired

          return res
            .status(400)
            .json({ success: false, error: "OTP has Expired" });
        }
        if (otp.OTP != req.body.OTP) {
          // if OTP is incorrect

          return res.status(400).json({ success: false, error: "Invalid OTP" });
        }
        // if all is well generate hashed password for the user and save it into DB
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
          name: req.body.name,
          password: secPass,
          email: req.body.email,
        });
        console.log(user);
        const authToken = jwt.sign(email, JWT_SECRET);

        return res.status(200).json({
          success: true,
          authToken: authToken,
          name: user.name,
          picture: user.picture,
        });
      }
    } catch (error) {
      // if there are some errors log them and send to the user some error occured
      console.error(error.message);
      return res.status(500).json({ success: false, error: error.message });
    }
  }
);

router.get("/withgoogle/:authToken", async (req, res) => {

  // get authToken from the url parameters as this request has been redirected by the google redirect with a jwtToken.
  authToken = req.params.authToken;
  try {

    // verify the authToken
    email = jwt.verify(authToken, JWT_SECRET);
  } catch (error) {
    console.log(error.message);

    // redirect if the authToken is tempered or there is some error
    return res.redirect(400, host + "/signup");
  }

  // find if the credentials exist in the DB meaning that the user is really coming from redirection from google_redirect
  const creds = await Creds.findOne({ email: email });
  console.log("Creds : ", creds);
  if (!creds) {

    // if not, bad request error
    return res
      .status(400)
      .json({ success: false, error: "invalid credentials" });
  }

  // find if the user previously logged in
  const userExists = await User.findOne({ email: email });
  console.log(userExists);

  // if not meaning that the user is coming for the first time
  if (!userExists) {

    // Function to get details of the user from the google API
    const getUserProfile = async (email) => {
      try {
        oauth2Client.setCredentials({
          access_token: creds.access_token,
        });
        const response = await google
          .oauth2("v2")
          .userinfo.get({ auth: oauth2Client });
        const profile = response.data; // user data
        console.log("User Profile:", profile);
        return profile;
      } catch (error) {

        // if there is some error log it onto console
        console.error("Error retrieving user profile:", error.message);
        return false;
      }
    };

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(email, salt); // create a temporary password for the user for security
    const profile = await getUserProfile(email);
    if (profile) {

      // try to save the user into DB
      try {
        const user = await User.create({
          name: profile.name,
          email: profile.email,
          password: secPass,
          picture: profile.picture,
        });
        const payload = JSON.stringify({
          success: true,
          authToken: authToken,
          name: user.name,
          picture: user.picture,
        });
        
        // if all goes well redirect to login page with user data
        return res.redirect(301, host + `/login/?payload=${payload}`);
      } catch (error) {
        console.log("cannot save user", error.message);
        return res.redirect(400, host + "/signup");
      }
    }
  } else if (userExists) {
    const payload = JSON.stringify({
      success: true,
      authToken: authToken,
      name: userExists.name,
      picture: userExists.picture,
    });
    return res.redirect(301, host + `/login/?payload=${payload}`);
  } else {
    return res
      .status(400)
      .json({ success: false, error: "invalid credentials" });
  }
});

module.exports = router;
