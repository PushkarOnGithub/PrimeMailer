const express = require('express');
const router = express.Router();
const {google} = require('googleapis');
const Creds = require('../models/Creds')

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const host = process.env.REACT_APP_SERVER_HOST

let oauth2Client = require('./oauth2Client.js');

let tokens = null;

// const scopes = [
//   'https://mail.google.com/',
//   'https://www.googleapis.com/auth/userinfo.email',
//   'https://www.googleapis.com/auth/userinfo.profile'
// ];

const getUserProfile = async(tokens) => {
  try {
    oauth2Client.setCredentials({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token
    });
    const response = await google.oauth2('v2').userinfo.get({ auth: oauth2Client });
    const profile = response.data;
    return profile;
  } catch (error) {
    console.error('Error retrieving user profile:', error.message);
    return false;
  }
}

// Save Credentials
const saveCreds = async(userInfo) => {
  try{
    console.log(userInfo.email)
    let userExists = await Creds.findOne({email: userInfo.email});
    console.log(userExists)
    if(userExists){
      console.log('user exists')
      const saved = await Creds.findOneAndUpdate({email: userInfo.email}, {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        date: tokens.expiry_date
      });
      console.log("creds updated")
      return saved;
    }
    else{
      console.log('user dont exist')
      let creds = new Creds({
        email: userInfo.email,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        date: tokens.expiry_date
      })
      const saved = await creds.save();
      console.log("creds created and saved", saved)
      return saved;
    }
}
  catch(error){
    console.log("cannot save creds", error.message);
    return false
  }
  
}

router.get('/', async(req, res) => {
  const code = req.query.code;
  // get a access_token from the api
  tokens = (await oauth2Client.getToken(code)).tokens

  // get the users profile from the api
  let userInfo = await getUserProfile(tokens);
  console.log("userInfo : ", userInfo)
  if(!userInfo){
    // res.redirect(400, 'http://127.0.0.1:3000/signup')
    res.redirect(400, `${host}/signup`)
    console.log('error in getting userInfo')
    return
  }
  // save the Credentials in DB
  let saved = await saveCreds(userInfo);
  console.log("saved Creds", saved);

  if(saved){
    const authToken= jwt.sign(userInfo.email, JWT_SECRET);
    // res.redirect(301, `http://127.0.0.1:5000/api/auth/signup/withgoogle/${authToken}`)}
    res.redirect(301, `${host}/api/auth/signup/withgoogle/${authToken}`)}
    else{
      // res.redirect(400, 'http://127.0.0.1:5000/api/auth/signup')
      res.redirect(400, `${host}/api/auth/signup`);
      console.error('error in saving creds')
  }
})

module.exports = router;