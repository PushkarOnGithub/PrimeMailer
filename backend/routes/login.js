const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const JWT_SECRET = "helloU$er";

router.post('/credentials',[
    body('email', "Invalid Email").isEmail(),
    body('password', "Password Can not be blank").exists(),
],async (req, res) =>{
  // if there are errors, return Bad request and the errors
    const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({success: false, errors: result.array() });
  }
  const {email, password} = req.body;
  // Check weather the user with the email exists.

  try{
  let user = await User.findOne({email: email});
  if(!user){
    res.status(400).json({success: false, "error": "User not registered"});
    return;
  }
  
  const passwordCompare = await bcrypt.compare(password, user.password);
  
  if(!passwordCompare){
    return res.status(400).json({success: false, "error": "2Incorrect Credentials"});
  }
  const authToken= jwt.sign(user.email, JWT_SECRET);

  res.status(200).json({
    success: true, 
    authToken: authToken,
    name: user.name,
    picture: user.picture
});
  }
  catch(error){
    console.log(error.message);
    res.status(500).json({success: false, "error": "Internal Server Error"});
  }
})

router.post('/withgoogle', async(req, res)=>{
  const {success, authToken, name, picture} = req.body;
  if(success && !jwt.verify(authToken, JWT_SECRET)){
    res.status(400).json({success: false, error: "Invalid Token"});
    return;
  }
  res.status(200).json({success: true, authToken: authToken, name: name, picture: picture});
  return ;
})

module.exports = router;