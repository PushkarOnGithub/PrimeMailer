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
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success: false, error: "Email already Registered" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      console.log(user);
      const authToken = jwt.sign(req.body.email, JWT_SECRET);
      res.json({
        success: true,
        authToken: authToken,
        name: user.name,
        picture: user.picture,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, error: "some error occured" });
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
